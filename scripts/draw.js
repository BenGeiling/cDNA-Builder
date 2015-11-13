function draw(object, what, clear, stage) {

	//Draw the bases (ATCGN)
	if (object.type === "base" || object.type === "comp" || object.type === "mrna") {
		stageBackground.beginPath();
		stageBackground.clearRect(
			object.X-object.border,
			object.Y-object.border,
			object.W+(object.border*2),
			object.H+(object.border*2)
		);
		stageBackground.rect(object.X, object.Y, object.W, object.H);
		stageBackground.globalAlpha = 1;
		stageBackground.fillStyle = object.color;
		stageBackground.fill();
		stageBackground.lineWidth = object.border;
		stageBackground.strokeStyle = "black";
		stageBackground.stroke();
		stageBackground.closePath();

		stageBackground.font = 'bold ' + (14*SCALE.T) + 'px Arial';
		stageBackground.fillStyle = 'black';
		stageBackground.textAlign = 'center';
		stageBackground.globalAlpha = 0.5;
		stageBackground.fillText(object.letter, object.X+(object.W/2), (object.Y+(15*SCALE.T)));
	}

	//Draw the codons
	if ((what === "all" || what === "codon") && object.type === "codon") {
		//Check if object is a multiple of 3 for codon drawing
			stageBackground.beginPath();
			stageBackground.clearRect(object.X-1, object.Y-1, (object.W+2), object.H+2);
			stageBackground.rect(object.X, object.Y, object.W, object.H);
			stageBackground.globalAlpha = 1;
			stageBackground.fillStyle = object.color;
			stageBackground.fill();
			stageBackground.lineWidth = 1;
			stageBackground.strokeStyle = "black";
			stageBackground.stroke();
			stageBackground.closePath();

			stageBackground.font = 'bold ' + (14*SCALE.T) + 'px Arial';
			stageBackground.fillStyle = 'black';
			stageBackground.textAlign = 'center';
			stageBackground.globalAlpha = 0.5;
			stageBackground.fillText(object.letter, object.X+(30*SCALE.T), object.Y+(15*SCALE.T));
	}

	//Draw the notes
	if ((what === "all" || what === "note") && object.type === "note") {
		//Check if object is a multiple of 3 for codon drawing
			stageBackground.beginPath();
			stageBackground.clearRect(object.X-1, object.Y-1, (object.W+2), object.H+2);
			stageBackground.rect(object.X, object.Y, object.W, object.H);
			stageBackground.globalAlpha = 1;
			stageBackground.fillStyle = object.color;
			stageBackground.fill();
			stageBackground.lineWidth = 1;
			stageBackground.strokeStyle = "black";
			stageBackground.stroke();
			stageBackground.closePath();

			stageBackground.font = 'bold ' + (14*SCALE.T) + 'px Arial';
			stageBackground.fillStyle = 'black';
			stageBackground.textAlign = 'center';
			stageBackground.globalAlpha = 0.5;
			stageBackground.fillText(object.text, object.X+(object.W/2), object.Y+(15*SCALE.T));
	}

	//Draw the enzyme names
	if ((what === "all" || what === "enzyme") && object.type === "enzyme") {
			stageForeground.beginPath();
			stageForeground.clearRect(object.X-(9*SCALE.T), object.Y+(2*SCALE.T), (19*SCALE.T), (7*SCALE.T));
			//stageForeground.rect(object.X-(9*SCALE.T), object.Y+(2*SCALE.T), (19*SCALE.T), (7*SCALE.T));
			//stageForeground.globalAlpha = 0.1;
			//stageForeground.fillStyle = object.color;
			//stageForeground.fill();
			stageForeground.closePath();

			stageForeground.font = 'bold ' + (8*SCALE.T) + 'px Arial';
			stageForeground.fillStyle = object.color;
			stageForeground.textAlign = 'center';
			stageForeground.globalAlpha = 0.7;
			stageForeground.fillText(object.name[0]+object.name[1]+object.name[2]+object.name[3], object.X+1, object.Y+(8*SCALE.T)); //fix me 3 should be enzyme length /2
	}

	//Draw the enzyme cut sites
	if ((what === "cutsite") && object.type === "enzyme") {
		stageForeground.clearRect(
			(object.location.X-1),
			(object.location.Y-1),
			(object.W*6)+2,
			(object.H*2)+2
		);

		if (clear === false) {

			stageForeground.beginPath();
			stageForeground.rect(
				(object.location.X-1),
				(object.location.Y-1),
				(object.W*6)+2,
				(object.H*2)+2
			);
			stageForeground.globalAlpha = 0.2;
			stageForeground.fillStyle = "blue";
			stageForeground.fill();
			stageForeground.closePath();

			stageForeground.beginPath();

			stageForeground.rect( //Draw 5' enzyme cut site
				((object.location.X-2)+(object.W*object.cutsite)+1),
				object.location.Y-1,
				2,
				object.H+2
			);

			stageForeground.rect( //Draw 3' enzyme cut site
				((object.location.X-2)+(object.W*(6-object.cutsite))+1), //fix me 6 should be enzyme length
				object.location.Y+object.H-1,
				2,
				object.H+2
			);

			stageForeground.rect( //Connect both cut sites
				((object.location.X-2)+(object.W*(object.cutsite))+1), //fix me 6 should be enzyme length
				object.location.Y+object.H-1,
				(object.W*(6-(object.cutsite*2))+2),
				2
			)

			//Draw everything
			stageForeground.globalAlpha = 1;
			stageForeground.fillStyle = "black";
			stageForeground.fill();
			stageForeground.closePath();
		}
	}

	//Draw the numbers
	if ((what === "all" || what === "number") && object.type === "number") {
		stageBackground.beginPath();
	//	stageBackground.clearRect(object.X-((object.W*scale.W)*2)-1, object.Y+21-1, (object.W*scale.W)*3+1, object.H+1);
	//	stageBackground.rect(object.X-((object.W*scale.W)*2), object.Y+21, (object.W*scale.W)*3, object.H);
		stageBackground.closePath();

		stageBackground.font = 'bold ' + (10*SCALE.T) + 'px Arial';
		stageBackground.fillStyle = object.color;
		stageBackground.textAlign = 'center';
		stageBackground.globalAlpha = 0.5;
		if (object.number !== (0 + WINDOW_LOCATION)) {
			stageBackground.fillText((object.number+1), object.X+(DISPLAY_SIZE*SCALE.T), object.Y);
		} else {
			stageBackground.fillText((object.number), object.X, object.Y+(DISPLAY_SIZE*SCALE.T)+(5*SCALE.T));
		}
	}

}

//Swap object color and highlight color
function highlightObject(object) {
	var colorTemp = object.color;
	object.color = object.colorHighlight;
	object.colorHighlight = colorTemp;
}
