varying vec3 vertextNormal;
void main(){
    float intensity = pow(0.5 - dot(vertextNormal,vec3(0,0,1.0)),2.0);
    //vec3 atmoshphere = vec3(0.3,0.6,1.0)*pow(intensity,1.5);
    gl_FragColor=vec4(0.3,0.6,1.0,1.0)*intensity;
    //float intensity = pow( 0.8 - dot( vertextNormal, vec3( 0, 0, 1.0 ) ), 12.0 );
    //gl_FragColor = vec4( 0.0, 1.0, 1.0, 1.0 ) * intensity;
}