function saveOptions(e) {
	/*Saves the blocked subreddits*/
	e.preventDefault();
	let redirectChecked = document.querySelector("#optionsRedirectFromSubredditCheckbox").checked;
	let textInput = document.querySelector("#optionsSubredditTextarea").value;
	let filteredText = textInput.toLowerCase();
	filteredText = filteredText.replace(/[ \t]/gm,"");	//remove spaces and tabs
	filteredText = filteredText.replace(/^\/?r\//gm,"");	//remove leading '/r/' or 'r/'
	filteredText = filteredText.replace(",","\n");	//replace commas with linebreaks
	let subreddits = filteredText.split("\n").filter(elem=>elem.length>0);
	subreddits.sort();
	browser.storage.sync.set({
		blockList: subreddits,
		redirectFromSubreddit: redirectChecked
	});
	document.querySelector("#optionsSubredditTextarea").value = subreddits.join("\n");
}

function restoreOptions() {
	/*Loads the saved options to display them in the options page*/
	function setCurrentChoice(result) {
		let blockList = result.blockList || [];
		document.querySelector("#optionsRedirectFromSubredditCheckbox").checked = result.redirectFromSubreddit || false;
		document.querySelector("#optionsSubredditTextarea").value = blockList.join("\n");
	}
	function onError(error) {
		console.log(`Error: ${error}`);
	}

	let getting = browser.storage.sync.get();
	getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
