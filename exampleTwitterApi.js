
            //Grab user's info using the first item in the array for the profile
            var result = response[0].user;
            
            var name = result.name;
            var screen_name = result.screen_name;
            var location = result.location;
            var description = result.description;
            var url = result.url;
            var followers_count = result.followers_count;
            var friends_count = result.friends_count;
            var favourites_count = result.favourites_count;
            var profile_img = result.profile_img;
            //Send these to profile component

            //Iterate through response object to get each tweet's information
            for(var i = 0; i < response.length; i++){
                
                var id = response[i].id;
                var created_at = response[i].created_at;
                var text = response[i].text;
                var retweets = response[i].retweet_count;
                var favorites = response[i].favorite_count; }
                //How to get replies/comments? A different API needed?
                //From there, send the comments to the NLP

                //Compare stored tweets to incoming ones using the ID
                //Only add new tweets to DB
                //Display tweets
                //Generate Graphs