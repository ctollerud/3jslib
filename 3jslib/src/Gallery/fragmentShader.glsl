//#pragma glslify: cnoise2 = require(glsl-noise)
// #pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
// #pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
// #pragma glslify: cnoise2 = require(glsl-noise/classic/2d)
// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d)
// #pragma glslify: cnoise4 = require(glsl-noise/classic/4d)
// #pragma glslify: pnoise2 = require(glsl-noise/periodic/2d)
// #pragma glslify: pnoise3 = require(glsl-noise/periodic/3d)
// #pragma glslify: pnoise4 = require(glsl-noise/periodic/4d)

//attribute vec3 position;


void main() {
    vec4 vec = vec4(1,2,3,4);

    vec3 c = vec3(1.,1.,1.);
    //int fortytwo = return42( c );
    float noise = snoise3( vec3(1,1,1) );

	//gl_FragColor = vec4(snoise3(vec3(gl_FragCoord.x, gl_FragCoord.y, gl_FragCoord.z)), 1.0);
    gl_FragColor = vec4(1.,0.,0.,1.0);
}