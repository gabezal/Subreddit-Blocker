function fetchSettingsAndRun(){
	/*Fetch the saved settings and removes posts from the blocked subreddits*/
	function onSettingLoad(item){
		//filter posts
		let posts = getAllPosts();
		for(let i=0; i<posts.length; i++){
			if(item.blockList.includes(getPostSubreddit(posts[i]))){
				//hide posts from blocked subreddits
				posts[i].setAttribute("style","display:none !important");
			}
		}
	}
	function onSettingError(error){
		console.error("subredditBlocker: Error when trying to load settings: "+error);
	}
	let getting = browser.storage.sync.get("blockList");
	getting.then(onSettingLoad,onSettingError);
}

function getAllPosts(){
	/*Get all of the posts currently shown*/
	try{
		let postTable = document.getElementById("siteTable");
		let postTableChildren = postTable.children;
		let postList = [];
		for(let i=0; i<postTableChildren.length; i++){
			if(
				postTableChildren[i].dataset.promoted=="false" &&
				!postTableChildren[i].classList.contains("clearleft")
			){
				postList.push(postTableChildren[i]);
			}
		}
		return postList;
	}
	catch(e){
		console.log("subredditBlocker: Error while getting posts: "+String(e));
		return;
	}
}

function getPostSubreddit(postNode){
	/* gets the lowercase name of the subreddit a post was submitted to */
	if(!(postNode instanceof HTMLElement)){
		//Fail if the object passed is not an html node
		return false;
	}
	return postNode.dataset.subreddit.toLowerCase();
}

fetchSettingsAndRun();
