// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;
    if (fract(_st.y * 0.5) > 0.5){
        _st.x += 0.5;
    }
    return fract(_st);
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(0.0001),_st);
    uv *= smoothstep(_size,_size+vec2(0.0001),vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;;

    st /= vec2(2.15,0.65)/2.15;

    st = brickTile(st+vec2(0.0,u_time*0.5),3.0);
    
    vec3 color = vec3(1.0-box(st,vec2(0.95)));

    gl_FragColor = vec4(color,1.0);    
}