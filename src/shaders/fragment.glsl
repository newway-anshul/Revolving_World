uniform sampler2D globeTexture;
varying vec2 vertextUV;
varying vec3 vertextNormal;
void main(){
    float intensity = 1.05 - dot(vertextNormal,vec3(0.0,0.0,1.0));
    vec3 atmoshphere = vec3(0.3,0.6,1.0)*pow(intensity,1.5);
    gl_FragColor=vec4(atmoshphere+texture2D(globeTexture,vertextUV).xyz,1.0);
}