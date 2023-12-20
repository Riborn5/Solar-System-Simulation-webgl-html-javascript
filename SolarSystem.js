/* SOLAR SYSTEM PROJECT - TEAM 3
ABDULHADI IBRAHIM ZUBAILAH - 201919250
OSAMA MAHMOUD OTAIF - 201915610
HASSAN JAWAD ALOBAID - 201967730
DHIAADDIN IBRAHIM HAMIDADDIN - 201918270
*/

var canvas;
var gl;

var SphereNum  = 0;
var CirclePointsNum = 722;
var numIndices = [];

var points = [];
var colors = [];
var triangles = [];
var uvs = [];

var mv;

var viewMatrixLoc;
var normalMatrix, normalMatrixLoc;
var modelViewMatrix
var modelViewMatrixLoc

var lightPosition = vec4(0, 0, 0, 1.0 );
var lightAmbient = vec4(1.5, 1.5, 1.5, 1.0 );
var lightDiffuse = vec4( 1, 1, 1, 1.0 );
var lightSpecular = vec4( 1000, 1000, 1000, 1.0 );

var materialAmbient = vec4( 0.2, 0.2, 0.2, 1.0 );
var materialDiffuse = vec4( 1, 1, 1, 1.0);
var materialSpecular = vec4( 1000, 1000, 1000, 1.0 );
var materialShininess = 100000000.0;

var ambientColor, diffuseColor, specularColor;

var aspect;
var modelView
var viewMatrixLoc;

var program;

const TWO_PI = Math.PI * 2
const QUARTER_TURN = Math.PI / 2;

var va = vec4(0.0, 0.0, -1.0,1);
var vb = vec4(0.0, 0.942809, 0.333333, 1);
var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
var vd = vec4(0.816497, -0.471405, 0.333333,1);

//All speeds are approximated to capture the real situation.
var secondsPerYear = 7; //Number of seconds simulation representing a full year
var thetaLoc;
var thetaSunItself = 0;
var SunSpeedItself = 1.997; //Sun Spinning Speed In KM/S
var thetaSunSpeedItself = SunSpeedItself/4.257142857/secondsPerYear; //Sun Spinning Speed In Simulation
var thetaOrbitItself = 0;
var OrbitSpeedItself = 1; //Orbit Spinning Speed In KM/S (Not accurate but visually pleasing)
var thetaOrbitSpeedItself = SunSpeedItself/4.257142857/secondsPerYear; //Orbit Spinning Speed In Simulation
var thetaMercury = 0;
var thetaMercuryItself = 0;
var mercurySpeed = 47.9; //Mercury Orbital Speed In KM/S
var MercurySpeedItself = 10.9; //Mercury Spinning Speed In KM/S
var thetaMercurySpeed = mercurySpeed/4.257142857/secondsPerYear; //Mercury Orbital Speed in Simulation
var thetaMercurySpeedItself = MercurySpeedItself/4.257142857/secondsPerYear; //Mercury Spinning Speed In Simulation
var thetaVenus = 0;
var thetaVenusItself = 0;
var venusSpeed = 35.0; //Venus Orbital Speed In KM/S
var VenusSpeedItself = 6.52; //Venus Spinning Speed In KM/S
var thetaVenusSpeed = venusSpeed/4.257142857/secondsPerYear; //Venus Orbital Speed in Simulation
var thetaVenusSpeedItself = VenusSpeedItself/4.257142857/secondsPerYear; //Venus Spinning Speed In Simulation
var thetaEarth = 0;
var thetaEarthItself = 0;
var earthSpeed = 29.8; //Earth Orbital Speed In KM/S 
var EarthSpeedItself = 1574; //Earth Spinning Speed In KM/S
var thetaEarthSpeed = earthSpeed/4.257142857/secondsPerYear; //Earth Orbital Speed in Simulation
var thetaEarthSpeedItself = EarthSpeedItself/4.257142857/secondsPerYear; //Earth Spinning Speed In Simulation
var thetaMars = 0;
var thetaMarsItself = 0;
var marsSpeed = 24.1; //Mars Orbital Speed In KM/S
var MarsSpeedItself = 866; //Mars Spinning Speed In KM/S
var thetaMarsSpeed = marsSpeed/4.257142857/secondsPerYear; //Mars Orbital Speed in Simulation
var thetaMarsSpeedItself = MarsSpeedItself/4.257142857/secondsPerYear; //Mars Spinning Speed In Simulation
var thetaJupiter = 0;
var thetaJupiterItself = 0;
var jupiterSpeed = 13.1; //Jupiter Orbital Speed In KM/S
var JupiterSpeedItself = 45583; //Jupiter Spinning Speed In KM/S
var thetaJupiterSpeed = jupiterSpeed/4.257142857/secondsPerYear; //Jupiter Orbital Speed in Simulation
var thetaJupiterSpeedItself = JupiterSpeedItself/4.257142857/secondsPerYear; //Jupiter Spinning Speed In Simulation
var thetaSaturn = 0;  
var thetaSaturnItself = 0;
var saturnSpeed = 9.7; //Saturn Orbital Speed In KM/S
var SaturnSpeedItself = 36840; //Saturn Spinning Speed In KM/S
var thetaSaturnSpeed = saturnSpeed/4.257142857/secondsPerYear; //Saturn Orbital Speed in Simulation
var thetaSaturnSpeedItself = SaturnSpeedItself/4.257142857/secondsPerYear; //Saturn Spinning Speed In Simulation
var thetaUranus = 0; 
var thetaUranusItself = 0;
var uranusSpeed = 6.8; //Uranus Orbital Speed In KM/S
var UranusSpeedItself = 14794; //Uranus Spinning Speed In KM/S
var thetaUranusSpeed = uranusSpeed/4.257142857/secondsPerYear; //Uranus Orbital Speed in Simulation
var thetaUranusSpeedItself = UranusSpeedItself/4.257142857/secondsPerYear; //Uranus Spinning Speed In Simulation
var thetaNeptune = 0;
var thetaNeptuneItself = 0;
var neptuneSpeed = 5.4; //Neptune Orbital Speed In KM/S
var NeptuneSpeedItself = 9719; //Neptune Spinning Speed In KM/S
var thetaNeptuneSpeed = neptuneSpeed/4.257142857/secondsPerYear; //Neptune Orbital Speed in Simulation
var thetaNeptuneSpeedItself = NeptuneSpeedItself/4.257142857/secondsPerYear; //Neptune Spinning Speed In Simulation
var thetaPluto = 0;
var thetaPlutoItself = 0;
var plutoSpeed = 4.74; //Pluto Orbital Speed In KM/S
var PlutoSpeedItself = 245.9; //Pluto Spinning Speed In KM/S
var thetaPlutoSpeed = plutoSpeed/4.257142857/secondsPerYear; //Pluto Orbital Speed in Simulation
var thetaPlutoSpeedItself = PlutoSpeedItself/4.257142857/secondsPerYear; //Pluto Spinning Speed In Simulation
var thetaMoon = 0;
var thetaMoonItself = 0;
var moonSpeed = 1.022; //Moon Orbital Speed In KM/S
var MoonSpeedItself = 58.3; //Moon Spinning Speed In KM/S
var thetaMoonSpeed = moonSpeed/4.257142857/secondsPerYear; //Moon Orbital Speed in Simulation
var thetaMoonSpeedItself = MoonSpeedItself/4.257142857/secondsPerYear; //Moon Spinning Speed In Simulation

var depthThetaCamera = 2.0;
var angleInRadians = 2.0 * (Math.PI / 180);
var topdownmovement= 2.0;

var texturesList = []; //Contains all textures loaded from HTML
var textures = []; //Contains textures after generating mipmaps

var projectionMatrixLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    //Full Screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    aspect = canvas.width / canvas.height;
    
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	sphereReturn = sphere(180);

    /*
    FOR TESTING
	console.log("points");
	console.log(points);
	console.log("colors");
	console.log(colors);
	console.log("triangles");
	console.log(triangles);
	console.log("uvs");
	console.log(uvs);
	*/

    circle() //Saturn Rings Vertices

    // Create and bind the color buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    // Get the attribute location for the color and enable it
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // Create and bind the vertex buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
	
    // Get the attribute location for the position and enable it
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Get the attribute location for the normal and enable it
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );
	
    // Create and bind the UV buffer
	var UVBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, UVBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(uvs), gl.STATIC_DRAW );
	
    // Get the attribute location for the UV coordinates and enable it
    var UV = gl.getAttribLocation( program, "UV" );
    gl.vertexAttribPointer( UV, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( UV );
	
    // Create and bind the index buffer
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array(flatten(triangles)), gl.STATIC_DRAW);
	console.log(flatten(triangles));

    // Get the uniform locations for the transformation matrices
    thetaLoc = gl.getUniformLocation(program, "theta"); 
    mv = gl.getUniformLocation(program, "mv"); 
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
    viewMatrixLoc = gl.getUniformLocation(program, "viewMatrix");


    // Calculate the ambient, diffuse, and specular products
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    // Set the uniform values
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
    flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
    flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), 
    flatten(specularProduct) );	
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), 
    flatten(lightPosition) );
    gl.uniform1f(gl.getUniformLocation(program, 
    "shininess"),materialShininess);
    
    //event listeners for buttons
    eventListeners();

    //For camera movement using keyboard
    function keyResponse(event) {
        var key = String.fromCharCode(event.keyCode);
        switch (key) {
            case '1':
                if (depthThetaCamera < 5.0)
                depthThetaCamera += 0.1;
                break;
            case '2':
                if (depthThetaCamera > 0.5)
                depthThetaCamera -= 0.1;
                break;
            case 'D':
                angleInRadians += 0.1;
                break;
            case 'A':
                angleInRadians -= 0.1;
                break;
            case 'W':
                if (topdownmovement < 4.0)
                topdownmovement += 0.1;
                break;
            case 'S':
                if (topdownmovement > -4.0)
                topdownmovement -= 0.1;
        }
    }
    

    //Load all textures
    var texSpace = document.getElementById("texSpace");
    var texSun = document.getElementById("texSun");
    var texMercury = document.getElementById("texMercury");
    var texVenus = document.getElementById("texVenus");
    var texEarth = document.getElementById("texEarth");
    var texMoon = document.getElementById("texMoon");
    var texMars = document.getElementById("texMars");
    var texJupiter = document.getElementById("texJupiter");
    var texSaturn = document.getElementById("texSaturn");
    var texSaturnRing1 = document.getElementById("texSaturnRing1");
    var texSaturnRing2 = document.getElementById("texSaturnRing2");
    var texSaturnRing3 = document.getElementById("texSaturnRing3");
    var texUranus = document.getElementById("texUranus");
    var texNeptune = document.getElementById("texNeptune");
    var texPluto = document.getElementById("texPluto");

    texturesList = [texSpace,texSun,texMercury,texVenus,texEarth,texMoon,texMars,texJupiter,
                    texSaturn,texSaturnRing1,texSaturnRing2,texSaturnRing3,texUranus,texNeptune,texPluto];
					
	gl.uniform1i(gl.getUniformLocation(program, "uTextureMap"), 0); // Set texture attribute location
	configureTextures();

    window.onkeydown = keyResponse;
        
    render();
}

function configureTextures() {
	for (var i = 0; i < texturesList.length; i++) {
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texturesList[i]);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.generateMipmap(gl.TEXTURE_2D);
		textures.push(texture);
	}
}


function circle() 
{
	for (var i = 0; i <= 360; i++) 
	{
		var r = 0.5;
		var theta = radians(i);
		var x = r * Math.sin(theta);
		var y = r * Math.cos(theta);
		points.push(vec4( x, y, 0, 1.0));
		colors.push([ 1.0, 1.0, 1.0, 1.0 ])
		
		// r = 0.4
		var r = 0.4;
		var theta = radians(i+1);
		var x = r * Math.sin(theta);
		var y = r * Math.cos(theta);
		points.push(vec4( x, y, 0, 1.0));
		colors.push([ 1.0, 1.0, 1.0, 1.0 ])
		
	}
	var theta = radians(0);
	var x = 0.5 * Math.sin(theta);
	var y = 0.5 * Math.cos(theta);
	points.push(vec4( x, y, 0, 1.0));
	colors.push([ 1.0, 1.0, 1.0, 1.0 ])
	
	var theta = radians(1);
	var x = 0.4 * Math.sin(theta);
	var y = 0.4 * Math.cos(theta);
	points.push(vec4( x, y, 0, 1.0));
	colors.push([ 1.0, 1.0, 1.0, 1.0 ])
	
}


function latLngToCartesian([radius, lat, lng]){
    lng = -lng + Math.PI / 2;
    return [
        radius * Math.cos(lat) * Math.cos(lng),
        radius * Math.sin(lat),
        radius * -Math.cos(lat) * Math.sin(lng),
    ];
}

function inverseLerp(start, end, value) {
    return (value - start) / (end - start);
}

// Function to create a sphere
function sphere(density){
	const radsPerUnit = Math.PI / density;
	const sliceVertCount = density * 2;

	//positions and UVs
	const positions = [];
	let latitude = -Math.PI / 2;
	//latitude
	for(let i = 0; i <= density; i++){
		const v = inverseLerp(-QUARTER_TURN, QUARTER_TURN, -latitude);
		let longitude = 0;
		let vertLength = sliceVertCount + ((i > 0 && i < density) ? 1 : 0); //middle rings need extra vert for end U value
		//longitude
		for (let j = 0; j < vertLength; j++) {
			var temp = latLngToCartesian([1, latitude, longitude]);
			temp.push(1);
			positions.push(vec4(temp));
			points.push(vec4(temp));
			uvs.push([inverseLerp(0, TWO_PI, longitude), v]);
			SphereNum = SphereNum + 1;
			longitude += radsPerUnit;
		}
		latitude += radsPerUnit;
	}
	

	//colors
	for(let i = 0; i < positions.length; i++){
		colors.push([1, 1, 1, 1]);
	}

	//triangles
	let ringStartP = 0;
	for(let ring = 0; ring < density; ring++){ // start at first ring
		const vertexBump = (ring > 0 ? 1 : 0);
		for (let sliceVert = 0; sliceVert < sliceVertCount; sliceVert++){
			const thisP = ringStartP + sliceVert;
			const nextP = ringStartP + sliceVert + 1;
			const nextRingP = thisP + sliceVertCount + vertexBump;
			const nextRingNextP = nextP + sliceVertCount + vertexBump;

			if(ring === 0){
				triangles.push([thisP, nextRingNextP, nextRingP]);
				numIndices = numIndices + 1;
			}
			if(ring === density - 1){
				triangles.push([thisP, nextP, nextRingP]);
				numIndices = numIndices + 1;
			}
			if(ring > 0 && ring < density - 1 && density > 2){
				triangles.push([thisP, nextRingNextP, nextRingP])
				triangles.push([thisP, nextP, nextRingNextP])
				numIndices = numIndices + 2;
			}
		}
		if(ring === 0){
			ringStartP += sliceVertCount;
		} else {
			ringStartP += sliceVertCount + 1;
		}
	}
	


	return {
		positions: positions.flat(),
		colors: colors.flat(),
		triangles: triangles.flat(),
		uvs: uvs.flat(),
		normals: positions.flat(),
	};
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   

    var fovy = 90; // Field of view in degrees
    var near = 0.1; // Near clipping plane
    var far = 100.0; // Far clipping plane

    var eye = vec3(0.0, 0.0, depthThetaCamera); // Camera position y#2.0
    var target = vec3(0.0, 0.0, 0.0); // Target point
    var up = vec3(0.0, 1.0, 0.0); // Up direction

    modelViewMatrix = lookAt(eye,target , up);

    normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];

    //var radius = depthThetaCamera; // Radius of the rotation (distance from the target)
    //var theta = angleInRadians; // Angle of rotation around the y-axis

    var eyeX = target[0] + depthThetaCamera * Math.sin(angleInRadians)
    //var eyeY = target[1] + radius * Math.sin(phi);
    var eyeZ = target[2] + depthThetaCamera * Math.cos(angleInRadians)

    var eye = vec3(eyeX, topdownmovement, eyeZ);

    var viewMatrix = lookAt(eye, target, up);

    // Assuming you have a perspective matrix variable named "projectionMatrix"
    projectionMatrix = perspective(fovy, aspect, near, far);
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix)); 


    //ORBIT
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    thetaOrbitItself += thetaOrbitSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,thetaOrbitItself,0));
    modelViewMatrix = scalem(8,8,8);
    modelViewMatrix = mult(translate(0,0,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

	 gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);



    //SUN
    gl.bindTexture(gl.TEXTURE_2D, textures[1]);
    thetaSunItself += thetaSunSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,thetaSunItself,0));
    modelViewMatrix = scalem(0.3,0.3,0.3);
    modelViewMatrix = mult(translate(0,0,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);
    


    //MERCURY
    gl.bindTexture(gl.TEXTURE_2D, textures[2]);
    thetaMercury += thetaMercurySpeed;
    thetaMercuryItself += thetaMercurySpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.05,0.05,0.05),rotate(thetaMercuryItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(0.4,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaMercury,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);

    //VENUS
    gl.bindTexture(gl.TEXTURE_2D, textures[3]);
    thetaVenus += thetaVenusSpeed;
    thetaVenusItself += thetaVenusSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.06,0.06,0.06), rotate(thetaVenusItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(0.55,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaVenus,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);

    //EARTH
    gl.bindTexture(gl.TEXTURE_2D, textures[4]);
	
    thetaEarth += thetaEarthSpeed;
    thetaEarthItself += thetaEarthSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.07,0.07,0.07), rotate(thetaEarthItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(0.8,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaEarth,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);

    // MOON
    gl.bindTexture(gl.TEXTURE_2D, textures[5]);
    thetaMoon += thetaMoonSpeed;
    thetaMoonItself += thetaMoonSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0, 0, 0));
    modelViewMatrix = mult(scalem(0.03,0.03,0.03), rotate(thetaMoonItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(0.8,0,0),modelViewMatrix); //Earth offset from center
    modelViewMatrix = mult(translate(0.15,0,0),modelViewMatrix); //Moon offset from Earth

    //The following three lines is for rotation around the earth
    modelViewMatrix = mult(translate(-0.8,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaMoon,0,1,0),modelViewMatrix);
    modelViewMatrix = mult(translate(0.8,0,0),modelViewMatrix);

    modelViewMatrix = mult(rotate(thetaEarth,0,1,0),modelViewMatrix); //Rotation around the sun
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix));

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);

    //MARS
    gl.bindTexture(gl.TEXTURE_2D, textures[6]);
    thetaMars += thetaMarsSpeed;
    thetaMarsItself += thetaMarsSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.04,0.04,0.04), rotate(thetaMarsItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(1.05,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaMars,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);

    //JUPITER
    gl.bindTexture(gl.TEXTURE_2D, textures[7]);
    thetaJupiter += thetaJupiterSpeed;
    thetaJupiterItself += thetaJupiterSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.12,0.12,0.12), rotate(thetaJupiterItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(1.25,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaJupiter,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);

    //SATURN
    gl.bindTexture(gl.TEXTURE_2D, textures[8]);
    thetaSaturn += thetaSaturnSpeed;
    thetaSaturnItself += thetaSaturnSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.11,0.11,0.11), rotate(thetaSaturnItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(1.8,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaSaturn,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);
	
	//SATURN RING
    gl.bindTexture(gl.TEXTURE_2D, textures[9]);
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.45,0.45,0.45), rotate(270,1,0,0)); 
    modelViewMatrix = mult(translate(1.8,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaSaturn,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawArrays( gl.TRIANGLE_STRIP, SphereNum, CirclePointsNum);
	
	gl.bindTexture(gl.TEXTURE_2D, textures[10]);
	gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.35,0.35,0.35), rotate(90,1,0,0)); 
    modelViewMatrix = mult(translate(1.8,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaSaturn,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );
	gl.drawArrays( gl.TRIANGLE_STRIP, SphereNum, CirclePointsNum);
	
	
	gl.bindTexture(gl.TEXTURE_2D, textures[11]);
	gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.28,0.28,0.28), rotate(90,1,0,0)); 
    modelViewMatrix = mult(translate(1.8,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaSaturn,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );
	gl.drawArrays( gl.TRIANGLE_STRIP, SphereNum, CirclePointsNum);
	

    //URANUS
    gl.bindTexture(gl.TEXTURE_2D, textures[12]);
    thetaUranus += thetaUranusSpeed;
    thetaUranusItself += thetaUranusSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.05,0.05,0.05), rotate(thetaUranusItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(2.1,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaUranus,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);
    
    //NEPTUNE
    gl.bindTexture(gl.TEXTURE_2D, textures[13]);
    thetaNeptune += thetaNeptuneSpeed;
    thetaNeptuneItself += thetaNeptuneSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.05,0.05,0.05), rotate(thetaNeptuneItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(2.25,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaNeptune,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);

    //PLUTO
    gl.bindTexture(gl.TEXTURE_2D, textures[14]);
    thetaPluto += thetaPlutoSpeed;
    thetaPlutoItself += thetaPlutoSpeedItself;
    gl.uniform3fv(thetaLoc, vec3(0,0,0));
    modelViewMatrix = mult(scalem(0.03,0.03,0.03), rotate(thetaPlutoItself,0,1,0)); //Rotation about itself and scaling
    modelViewMatrix = mult(translate(2.4,0,0),modelViewMatrix);
    modelViewMatrix = mult(rotate(thetaPluto,0,1,0),modelViewMatrix);
    gl.uniformMatrix4fv(mv, false, flatten(modelViewMatrix) );

    gl.drawElements(gl.TRIANGLES, flatten(triangles).length, gl.UNSIGNED_SHORT, 0);
    
    requestAnimFrame( render );
}

function eventListeners()
{
	document.getElementById( "sunSpinSpeed" ).oninput = function () {
        const value = document.getElementById("sunSpinSpeed").value;
        const input = document.querySelector("#valueSunSpinSpeed");
        input.textContent = value;
        SunSpeedItself = parseFloat(value);
        thetaSunSpeedItself = SunSpeedItself/4.257142857/secondsPerYear; //Sun Spinning Speed in Simulation
    };

    document.getElementById( "moonSpinSpeed" ).oninput = function () {
        const value = document.getElementById("moonSpinSpeed").value;
        const input = document.querySelector("#valueMoonSpinSpeed");
        input.textContent = value;
        MoonSpeedItself = parseFloat(value);
        thetaMoonSpeedItself = MoonSpeedItself/4.257142857/secondsPerYear; //Moon Spinning Speed in Simulation
    };

    document.getElementById( "orbitSpinSpeed" ).oninput = function () {
        const value = document.getElementById("orbitSpinSpeed").value;
        const input = document.querySelector("#valueOrbitSpinSpeed");
        input.textContent = value;
        OrbitSpeedItself = parseFloat(value);
        thetaOrbitSpeedItself = OrbitSpeedItself/4.257142857/secondsPerYear; //Sun Spinning Speed in Simulation
    };

    document.getElementById( "mercurySpinSpeed" ).oninput = function () {
        const value = document.getElementById("mercurySpinSpeed").value;
        const input = document.querySelector("#valueMercurySpinSpeed");
        input.textContent = value;
        MercurySpeedItself = parseFloat(value);
        thetaMercurySpeedItself = MercurySpeedItself/4.257142857/secondsPerYear; //Mercury Spinning Speed in Simulation
    };

    document.getElementById( "venusSpinSpeed" ).oninput = function () {
        const value = document.getElementById("venusSpinSpeed").value;
        const input = document.querySelector("#valueVenusSpinSpeed");
        input.textContent = value;
        VenusSpeedItself = parseFloat(value);
        thetaVenusSpeedItself = VenusSpeedItself/4.257142857/secondsPerYear; //Venus Spinning Speed in Simulation
    };

    document.getElementById( "earthSpinSpeed" ).oninput = function () {
        const value = document.getElementById("earthSpinSpeed").value;
        const input = document.querySelector("#valueEarthSpinSpeed");
        input.textContent = value;
        EarthSpeedItself = parseFloat(value);
        thetaEarthSpeedItself = EarthSpeedItself/4.257142857/secondsPerYear; //Earth Spinning Speed in Simulation
    };

    document.getElementById( "marsSpinSpeed" ).oninput = function () {
        const value = document.getElementById("marsSpinSpeed").value;
        const input = document.querySelector("#valueMarsSpinSpeed");
        input.textContent = value;
        MarsSpeedItself = parseFloat(value);
        thetaMarsSpeedItself = MarsSpeedItself/4.257142857/secondsPerYear; //Mars Spinning Speed in Simulation
    };

    document.getElementById( "jupiterSpinSpeed" ).oninput = function () {
        const value = document.getElementById("jupiterSpinSpeed").value;
        const input = document.querySelector("#valueJupiterSpinSpeed");
        input.textContent = value;
        JupiterSpeedItself = parseFloat(value);
        thetaJupiterSpeedItself = JupiterSpeedItself/4.257142857/secondsPerYear; //Jupiter Spinning Speed in Simulation
    };

    document.getElementById( "saturnSpinSpeed" ).oninput = function () {
        const value = document.getElementById("saturnSpinSpeed").value;
        const input = document.querySelector("#valueSaturnSpinSpeed");
        input.textContent = value;
        SaturnSpeedItself = parseFloat(value);
        thetaSaturnSpeedItself = SaturnSpeedItself/4.257142857/secondsPerYear; //Saturn Spinning Speed in Simulation
    };

    document.getElementById( "uranusSpinSpeed" ).oninput = function () {
        const value = document.getElementById("uranusSpinSpeed").value;
        const input = document.querySelector("#valueUranusSpinSpeed");
        input.textContent = value;
        UranusSpeedItself = parseFloat(value);
        thetaUranusSpeedItself = UranusSpeedItself/4.257142857/secondsPerYear; //Uranus Spinning Speed in Simulation
    };

    document.getElementById( "neptuneSpinSpeed" ).oninput = function () {
        const value = document.getElementById("neptuneSpinSpeed").value;
        const input = document.querySelector("#valueNeptuneSpinSpeed");
        input.textContent = value;
        NeptuneSpeedItself = parseFloat(value);
        thetaNeptuneSpeedItself = NeptuneSpeedItself/4.257142857/secondsPerYear; //Neptune Spinning Speed in Simulation
    };

    document.getElementById( "plutoSpinSpeed" ).oninput = function () {
        const value = document.getElementById("plutoSpinSpeed").value;
        const input = document.querySelector("#valuePlutoSpinSpeed");
        input.textContent = value;
        PlutoSpeedItself = parseFloat(value);
        thetaPlutoSpeedItself = PlutoSpeedItself/4.257142857/secondsPerYear; //Pluto Spinning Speed in Simulation
    };

    document.getElementById( "secondsYear" ).oninput = function () {
        const value = document.getElementById("secondsYear").value;
        const input = document.querySelector("#valueSecondsYear");
        input.textContent = value;
        secondsPerYear = parseFloat(value);
        thetaSunSpeedItself = SunSpeedItself/4.257142857/secondsPerYear; //Sun Spinning Speed in Simulation
        thetaMercurySpeedItself = MercurySpeedItself/4.257142857/secondsPerYear; //Mercury Spinning Speed in Simulation
        thetaVenusSpeedItself = VenusSpeedItself/4.257142857/secondsPerYear; //Venus Spinning Speed in Simulation
        thetaEarthSpeedItself = EarthSpeedItself/4.257142857/secondsPerYear; //Earth Spinning Speed in Simulation
        thetaMarsSpeedItself = MarsSpeedItself/4.257142857/secondsPerYear; //Mars Spinning Speed in Simulation
        thetaJupiterSpeedItself = JupiterSpeedItself/4.257142857/secondsPerYear; //Jupiter Spinning Speed in Simulation
        thetaSaturnSpeedItself = SaturnSpeedItself/4.257142857/secondsPerYear; //Saturn Spinning Speed in Simulation
        thetaUranusSpeedItself = UranusSpeedItself/4.257142857/secondsPerYear; //Uranus Spinning Speed in Simulation
        thetaNeptuneSpeedItself = NeptuneSpeedItself/4.257142857/secondsPerYear; //Neptune Spinning Speed in Simulation
        thetaPlutoSpeedItself = PlutoSpeedItself/4.257142857/secondsPerYear; //Pluto Spinning Speed in Simulation
        thetaMercurySpeed = mercurySpeed/4.257142857/secondsPerYear; //Mercury Orbital Speed in Simulation
        thetaVenusSpeed = venusSpeed/4.257142857/secondsPerYear; //Venus Orbital Speed in Simulation
        thetaEarthSpeed = earthSpeed/4.257142857/secondsPerYear; //Earth Orbital Speed in Simulation
        thetaMarsSpeed = marsSpeed/4.257142857/secondsPerYear; //Mars Orbital Speed in Simulation
        thetaJupiterSpeed = jupiterSpeed/4.257142857/secondsPerYear; //Jupiter Orbital Speed in Simulation
        thetaSaturnSpeed = saturnSpeed/4.257142857/secondsPerYear; //Saturn Orbital Speed in Simulation
        thetaUranusSpeed = uranusSpeed/4.257142857/secondsPerYear; //Uranus Orbital Speed in Simulation
        thetaNeptuneSpeed = neptuneSpeed/4.257142857/secondsPerYear; //Neptune Orbital Speed in Simulation
        thetaPlutoSpeed = plutoSpeed/4.257142857/secondsPerYear; //Pluto Orbital Speed in Simulation
        thetaOrbitSpeedItself = OrbitSpeedItself/4.257142857/secondsPerYear; //Orbit Orbital Speed in Simulation (Design Choice)
        thetaMoonSpeedItself = MoonSpeedItself/4.257142857/secondsPerYear; //Moon Spinning Speed in Simulation
        thetaMoonSpeed = moonSpeed/4.257142857/secondsPerYear; //Moon Orbital Speed in Simulation
    };

    document.getElementById( "mercurySpeed" ).oninput = function () {
        const value = document.getElementById("mercurySpeed").value;
        const input = document.querySelector("#valueMercurySpeed");
        input.textContent = value;
        mercurySpeed = parseFloat(value); //Mercury Orbital Speed In KM/S
        thetaMercurySpeed = mercurySpeed/4.257142857/secondsPerYear; //Mercury Orbital Speed in Simulation
    };

    document.getElementById( "venusSpeed" ).oninput = function () {
        const value = document.getElementById("venusSpeed").value;
        const input = document.querySelector("#valueVenusSpeed");
        input.textContent = value;
        venusSpeed = parseFloat(value); //Venus Orbital Speed In KM/S
        thetaVenusSpeed = venusSpeed/4.257142857/secondsPerYear; //Venus Orbital Speed in Simulation
    };

    document.getElementById( "earthSpeed" ).oninput = function () {
        const value = document.getElementById("earthSpeed").value;
        const input = document.querySelector("#valueEarthSpeed");
        input.textContent = value;
        earthSpeed = parseFloat(value); //Earth Orbital Speed In KM/S
        thetaEarthSpeed = earthSpeed/4.257142857/secondsPerYear; //Earth Orbital Speed in Simulation
    };

    document.getElementById( "moonSpeed" ).oninput = function () {
        const value = document.getElementById("moonSpeed").value;
        const input = document.querySelector("#valueMoonSpeed");
        input.textContent = value;
        moonSpeed = parseFloat(value); //Moon Orbital Speed In KM/S
        thetaMoonSpeed = moonSpeed/4.257142857/secondsPerYear; //Moon Orbital Speed in Simulation
    };

    document.getElementById( "marsSpeed" ).oninput = function () {
        const value = document.getElementById("marsSpeed").value;
        const input = document.querySelector("#valueMarsSpeed");
        input.textContent = value;
        marsSpeed = parseFloat(value); //Mars Orbital Speed In KM/S
        thetaMarsSpeed = marsSpeed/4.257142857/secondsPerYear; //Mars Orbital Speed in Simulation
    };

    document.getElementById( "jupiterSpeed" ).oninput = function () {
        const value = document.getElementById("jupiterSpeed").value;
        const input = document.querySelector("#valueJupiterSpeed");
        input.textContent = value;
        jupiterSpeed = parseFloat(value); //Jupiter Orbital Speed In KM/S
        thetaJupiterSpeed = jupiterSpeed/4.257142857/secondsPerYear; //Jupiter Orbital Speed in Simulation
    };

    document.getElementById( "saturnSpeed" ).oninput = function () {
        const value = document.getElementById("saturnSpeed").value;
        const input = document.querySelector("#valueSaturnSpeed");
        input.textContent = value;
        saturnSpeed = parseFloat(value); //Saturn Orbital Speed In KM/S
        thetaSaturnSpeed = saturnSpeed/4.257142857/secondsPerYear; //Saturn Orbital Speed in Simulation
    };

    document.getElementById( "uranusSpeed" ).oninput = function () {
        const value = document.getElementById("uranusSpeed").value;
        const input = document.querySelector("#valueUranusSpeed");
        input.textContent = value;
        uranusSpeed = parseFloat(value); //Uranus Orbital Speed In KM/S
        thetaUranusSpeed = uranusSpeed/4.257142857/secondsPerYear; //Uranus Orbital Speed in Simulation
    };

    document.getElementById( "neptuneSpeed" ).oninput = function () {
        const value = document.getElementById("neptuneSpeed").value;
        const input = document.querySelector("#valueNeptuneSpeed");
        input.textContent = value;
        neptuneSpeed = parseFloat(value); //Neptune Orbital Speed In KM/S
        thetaNeptuneSpeed = neptuneSpeed/4.257142857/secondsPerYear; //Neptune Orbital Speed in Simulation
    };

    document.getElementById( "plutoSpeed" ).oninput = function () {
        const value = document.getElementById("plutoSpeed").value;
        const input = document.querySelector("#valuePlutoSpeed");
        input.textContent = value;
        plutoSpeed = parseFloat(value); //Pluto Orbital Speed In KM/S
        thetaPlutoSpeed = plutoSpeed/4.257142857/secondsPerYear; //Pluto Orbital Speed in Simulation
    };
}