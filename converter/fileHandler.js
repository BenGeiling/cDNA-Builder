//Setup LineReader instance
var lr = new LineReader({chunkSize: 1024});

//Setup output global variables
var outputDIV = '#output'; //DIV to output to
var outputText = ""; //Text to output to file
var objectName = ""; //Name of the object to output

//LineReader error handling function
lr.on('error', function (err) {console.log(err);});

//When LineReader finishes create and display output file
lr.on('end', function () {outputFile();});

//Read the file
function fileRead(file) {
	//Define and setup variables
	var file = $(file).get(0).files[0];

	//LineReader file read function
	lr.read(file);

	//LineReader on line function
	lr.on('line', function (line, next) {

		//Call fileLine function in main JS
		fileLine(line);

		//Output progress to DIV
		$(outputDIV).text("Converting object: " + (totalCount-3));

		//Prevent hanging and allow display of progress (wait 1ms each line)
		setTimeout(function () {next();}, 1);
	});
}

//Output file to some DIV
function outputFile() {
	$(outputDIV).attr('download', objectName + ".js"); //Set file name
	$(outputDIV).text("Download: " + objectName + ".js"); //Create download text

	//Link the file to a DIV
	document.getElementById('output').onclick = linkFile('output', outputText);
}

//Link a DIV to a newly generated file
function linkFile(outputDIV, outputData) {
	document.getElementById(outputDIV).href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(outputData);
}

