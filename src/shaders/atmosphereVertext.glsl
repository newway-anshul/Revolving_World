varying vec2 vertextUV;
varying vec3 vertextNormal;
void main(){
    vertextUV = uv;
    vertextNormal = normalize(normalMatrix*normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1);
}