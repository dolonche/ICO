"use strict";

var GK = GK || {};
GK.BackgroundDrawable = function(){
    var vertex = `
        precision highp float;

        attribute vec3 aPosition;
        attribute vec3 aNormal;
        attribute vec2 aTexture;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        uniform vec3 uLightDir;

        varying vec2 vTexture;
        varying float vLightWeight;

        void main(void) {
            vec4 mvPosition = uMVMatrix * vec4(aPosition, 1.0);
            gl_Position = uPMatrix * mvPosition;

            vec3 transformedNormal = normalize(mat3(uMVMatrix) * aNormal);
            vec3 lightDirection = normalize(uLightDir - mvPosition.xyz);
            vLightWeight = max(dot(transformedNormal, lightDirection), 0.955);

            vTexture = aTexture;
        }
    `;

    var fragment = `
        precision highp float;

        varying vec2 vTexture;
        varying float vLightWeight;
        uniform sampler2D uSampler;
        uniform float uAlpha;

        void main(void) {
            vec4 textureColor = texture2D(uSampler, vTexture);
            gl_FragColor = vec4(textureColor.rgb * vLightWeight, textureColor.a * uAlpha);
        }
    `;

    var self = this;

    // WebGL
    var texture;
    var vertexBuffer;
    var indexBuffer;
    var vertexCount;
    var indexCount;

    var lightOrigin = vec3.fromValues(0.0, 0.0, 0.0);
    this.lightDir = vec3.fromValues(0.0, 0.0, 1.0);
    this.alpha = 1.0;

    this.modelMatrix = mat4.create();
    mat4.identity(this.modelMatrix);

    var texture = null;

    this.init = function() {
        this.program = GK.ProgramManager.create(vertex, fragment);
        var imgData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAAbhaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjgyOWJjZWQ3LTNjNTctNGRmOC05ODc5LTQxYzIzZjc1NjlmYSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmQ4YTY5YjBiLThhY2ItMjk0OS1iMzlkLTE3ZGQ4NWVjNjVkZSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkMTI5YjRjZC0zM2I1LTU3NGEtOWIxYS05YjgzMGVkOGIzNzQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA1LTI5VDEzOjA2OjU1KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNS0yOVQxNzo0ODowNyswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNS0yOVQxNzo0ODowNyswMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJBZG9iZSBSR0IgKDE5OTgpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTFlMTdjNjItY2Q3MC00MmYxLTkyYmYtMDcxNTNkODQ4NTRkIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NmI0YTAzNDctOTA1NS0xMTdhLWEzMTMtZTBmZjdhNzYyY2IxIi8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmJhMzQ0MDUyLTAyMjAtNjc0My1hOThlLTg3OTI5ODI4YTk3NiIgc3RFdnQ6d2hlbj0iMjAxOC0wNS0yOVQxNjowMzo1MiswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2Vu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";
        texture = GK.TextureManager.loadTexture(imgData, true, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
        return this;
    }

    this.loadModel = function(model) {
        var vertices = model.vertices;
        var indices = model.indices;

        vertexCount = vertices.length;
        indexCount = indices.length;

        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    }

    this.draw = function(camera, time){
        if(!texture.loaded) return;
        gl.useProgram(this.program.name);

        this.lightDir = vec3.fromValues(-3.0, Math.sin(time * 0.001) * 2.0, Math.cos(time * 0.0008) * 4.0);

        gl.uniformMatrix4fv(this.program.uniforms.uPMatrix, false, camera.perspectiveMatrix);
        gl.uniformMatrix4fv(this.program.uniforms.uMVMatrix, false, this.modelMatrix);
        gl.uniform3fv(this.program.uniforms.uLightDir, this.lightDir);
        gl.uniform1f(this.program.uniforms.uAlpha, this.alpha);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(this.program.uniforms.uSampler, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        gl.vertexAttribPointer(this.program.attributes.aPosition, 3, gl.FLOAT, false, 32, 0);
        gl.vertexAttribPointer(this.program.attributes.aNormal, 3, gl.FLOAT, false, 32, 12);
        gl.vertexAttribPointer(this.program.attributes.aTexture, 2, gl.FLOAT, false, 32, 24);

        gl.enableVertexAttribArray(this.program.attributes.aPosition);
        gl.enableVertexAttribArray(this.program.attributes.aNormal);
        gl.enableVertexAttribArray(this.program.attributes.aTexture);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);
    }
}
