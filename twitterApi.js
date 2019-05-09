

$(document).ready(function(){

    //Need JQuery

    //Need a class name shared by the Log In and Sign In submit buttons
    //Using submit-button for example
    $("#submit-button").on ("click", function (){

        //Empty the twitter feed on the the Feed Component and the profile
        //Query DB for stored tweets

        //Need an API here
        //Need to grab user's screen name 
        var queryUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&exclude_replies=false&screen_name=";
        $.ajax({
            url: queryUrl,
            method: GET
        }).then(function(response){
            //Grab user's info using the first item in the array for the profile
            var result = response[0].user;

            var name = result.name;
            var screen_name = result.screen_name;
            var location = result.location;
            var description = result.description;
            var url = result.url;
            var followers = result.followers_count;
            var friends = result.friends_count;
            var favourites = result.favourites_count;
            var image = result.profile_img_url_https;
            //Send these to profile component

            //Iterate through response object to get each tweet's information
            for(var i = 0; i < response.length; i++){
                
                var id = response[i].id;
                var created_at = response[i].created_at;
                var text = response[i].text;
                var retweets = response[i].retweet_count;
                var favorites = response[i].favorite_count;
                //How to get replies/comments? A different API needed?
                //From there, send the comments to the NLP

                //Compare stored tweets to incoming ones using the ID
                //Only add new tweets to DB
                //Display tweets
                //Generate Graphs
            }
        })
    })
})