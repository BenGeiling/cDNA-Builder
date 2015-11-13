//Global Variables
var candidateEnzyme = new Array();
var originalEnzyme = new Array();

var AASequence;

/***********************************************
************************************************
*          Calculate Possible RE Sites         *
************************************************
************************************************/
function calculate(str) {
	//Reset candidates
	candidateEnzyme = new Array();
	originalEnzyme = new Array();

	var sequenceValue = str;
	AASequence = getAASequence(sequenceValue);
	var base = 0;

	ENZYMES.forEach(function(object) {
		var reg = new RegExp(object.sequence, 'g');
		while ((match = reg.exec(sequenceValue)) !== null) {
			var newObject = { //Create new enzyme object
				name: object.name,
				location: (match.index+WINDOW_LOCATION),
				cutsite: object.cutsite,
				sequence: match[0]
			}; originalEnzyme.push(newObject); //Push object into originalEnzyme
		}
	});

	//Look for restriction enzyme sites in test sequence
	while (base <= 3) {
		var index = 0;

		while (index < sequenceValue.length) {
			if (base == 0) {var letter="A";} else if (base == 1) {var letter="T";} else if (base == 2) {var letter="C";} else if (base == 3) {var letter="G";}
			var testValue = setCharAt(sequenceValue,index,letter);
			var AATest = getAASequence(testValue);

			if (testValue !== sequenceValue && AATest == AASequence) {
				ENZYMES.forEach(function(object) {
					var reg = new RegExp(object.sequence, 'g');
					while ((match = reg.exec(testValue)) !== null) { //While test sequence array has RE-Site
						var duplicate = false;
						for (x = 0; x < originalEnzyme.length; x++) {
							if (object.name === originalEnzyme[x].name) {
								if ((match.index+WINDOW_LOCATION) === originalEnzyme[x].location) {
									duplicate = true;
								}
							}
						}
						if (duplicate === false) {
							var newObject = { //Create new enzyme object
								name: object.name,
								location: (match.index+WINDOW_LOCATION),
								cutsite: object.cutsite,
								sequence: match[0],
								mutant: (index+WINDOW_LOCATION),
								newBase: letter
							}; candidateEnzyme.push(newObject); //Push object into candidateEnzyme
						}
					}
				});
			}

			index += 1;
		}

		base += 1;
	}
	//outputResults();
}

/***********************************************
************************************************
*         Output Results To Text Field         *
************************************************
************************************************/
function outputResults() {
	candidateEnzyme.forEach(function(object) {
    		console.log(object);
	});
	originalEnzyme.forEach(function(object) {
    		console.log(object);
	});
}

/***********************************************
************************************************
*          Change A Single Nucleotide          *
************************************************
************************************************/
function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}

/***********************************************
************************************************
*       Convert From Codon To Amino Acid       *
************************************************
************************************************/
function getAASequence(str) {
	var x=0;
	var AAOutput="";
	while (x < str.length) {
		if (str.substring(x,x+3) == "ATG") {
			AAOutput = AAOutput + "MET";
		} else if (str.substring(x,x+3) == "TTT" || str.substring(x,x+3) == "TTC") {
			AAOutput = AAOutput + "PHE";
		} else if (str.substring(x,x+3) == "TTA" || str.substring(x,x+3) == "TTG") {
			AAOutput = AAOutput + "LEU";
		} else if (str.substring(x,x+3) == "CTT" || str.substring(x,x+3) == "CTC" || str.substring(x,x+3) == "CTA" || str.substring(x,x+3) == "CTG") {
			AAOutput = AAOutput + "LEU";
		} else if (str.substring(x,x+3) == "ATT" || str.substring(x,x+3) == "ATC" || str.substring(x,x+3) == "ATA") {
			AAOutput = AAOutput + "ILE";
		} else if (str.substring(x,x+3) == "GTT" || str.substring(x,x+3) == "GTC" || str.substring(x,x+3) == "GTA" || str.substring(x,x+3) == "GTG") {
			AAOutput = AAOutput + "VAL";
		} else if (str.substring(x,x+3) == "TCT" || str.substring(x,x+3) == "TCC" || str.substring(x,x+3) == "TCA" || str.substring(x,x+3) == "TCG") {
			AAOutput = AAOutput + "SER";
		} else if (str.substring(x,x+3) == "CCT" || str.substring(x,x+3) == "CCC" || str.substring(x,x+3) == "CCA" || str.substring(x,x+3) == "CCG") {
			AAOutput = AAOutput + "PRO";
		} else if (str.substring(x,x+3) == "ACT" || str.substring(x,x+3) == "ACC" || str.substring(x,x+3) == "ACA" || str.substring(x,x+3) == "ACG") {
			AAOutput = AAOutput + "THR";
		} else if (str.substring(x,x+3) == "GCT" || str.substring(x,x+3) == "GCC" || str.substring(x,x+3) == "GCA" || str.substring(x,x+3) == "GCG") {
			AAOutput = AAOutput + "ALA";
		} else if (str.substring(x,x+3) == "TAT" || str.substring(x,x+3) == "TAC") {
			AAOutput = AAOutput + "TYR";
		} else if (str.substring(x,x+3) == "TAA" || str.substring(x,x+3) == "TAG" || str.substring(x,x+3) == "TGA") {
			AAOutput = AAOutput + "END";
		} else if (str.substring(x,x+3) == "CAT" || str.substring(x,x+3) == "CAC") {
			AAOutput = AAOutput + "HIS";
		} else if (str.substring(x,x+3) == "CAA" || str.substring(x,x+3) == "CAG") {
			AAOutput = AAOutput + "GLN";
		} else if (str.substring(x,x+3) == "AAT" || str.substring(x,x+3) == "AAC") {
			AAOutput = AAOutput + "ASN";
		} else if (str.substring(x,x+3) == "AAA" || str.substring(x,x+3) == "AAG") {
			AAOutput = AAOutput + "LYS";
		} else if (str.substring(x,x+3) == "GAT" || str.substring(x,x+3) == "GAC") {
			AAOutput = AAOutput + "ASP";
		} else if (str.substring(x,x+3) == "GAA" || str.substring(x,x+3) == "GAG") {
			AAOutput = AAOutput + "GLU";
		} else if (str.substring(x,x+3) == "TGT" || str.substring(x,x+3) == "TGC") {
			AAOutput = AAOutput + "CYS";
		} else if (str.substring(x,x+3) == "TGG") {
			AAOutput = AAOutput + "TRP";
		} else if (str.substring(x,x+3) == "CGT" || str.substring(x,x+3) == "CGC" || str.substring(x,x+3) == "CGA" || str.substring(x,x+3) == "CGG") {
			AAOutput = AAOutput + "ARG";
		} else if (str.substring(x,x+3) == "AGT" || str.substring(x,x+3) == "AGC") {
			AAOutput = AAOutput + "SER";
		} else if (str.substring(x,x+3) == "AGA" || str.substring(x,x+3) == "AGG") {
			AAOutput = AAOutput + "ARG";
		} else if (str.substring(x,x+3) == "GGT" || str.substring(x,x+3) == "GGC" || str.substring(x,x+3) == "GGA" || str.substring(x,x+3) == "GGG") {
			AAOutput = AAOutput + "GLY";
		} else {
			AAOutput = AAOutput + "---";
		}
		x += 3;
	}
	return AAOutput;
}

/***********************************************
************************************************
*        Convert From 5' To 3' Strand          *
************************************************
************************************************/
function getCompBase(base) {
	if (base === "A") {
		return "T";
	} else if (base === "T") {
		return "A";
	} else if (base === "C") {
		return "G";
	} else if (base === "G") {
		return "C";
	} else {
		return "-";
	}
}

/***********************************************
************************************************
*          Convert From DNA To RNA             *
************************************************
************************************************/
function getRNA(base) {
	if (base === "T") {
		return "U";
	} else {
		return base;
	}
}
