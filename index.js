const config = require('./config');
const twit = require('twit');
const T = new twit(config);

// set up search params
const params = {
    q: '#javascript #react #reactjs #nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}


//  search twitter for all tweets containing #reactjs
T.get('search/tweets', params , function(err, data, response) {
    if(!err){
        console.log(data);
        for(let i = 0; i < data.statuses.length; i++) {
            let id = {id: data.statuses[i].id_str};
            // lets favorite the tweets
            T.post('favorites/create', id, function(err, res) {
                if(!err) {
                    let username = res.user.screen_name;
                    let tweetId = res.id_str;
                    console.log(`Favorited: https://twitter.com/${username}/status/${tweetId}`);
                } else {
                    console.log(err.message);
                }
            });
        }
    } else {
        console.log(err);
    }
});