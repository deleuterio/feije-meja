(function () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const POST_URL = window.location.href;

    fetch(`https://api.instagram.com/oembed/?url=${POST_URL}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "content": "Venha ver o novo post no Instagram! Dá um like lá, vai...",
                "embeds": [
                    {
                        // "author": {
                        //     "name": "Birdie♫",
                        //     "url": "https://www.reddit.com/r/cats/",
                        //     "icon_url": "https://i.imgur.com/R66g1Pe.jpg"
                        // },
                        title: data.author_name,
                        "url": data.author_url,
                        "description": data.title,
                        "color": 3125991,
                        "fields": [
                            {
                                "name": "Thanks!",
                                "value": ":wink:",
                                inline: true
                            }
                        ],
                        "thumbnail": {
                            "url": data.thumbnail_url
                        },
                        "image": {
                            "url": data.thumbnail_url
                        },
                    }
                ]
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const DISCORD_WEBHOOK = '{{URL AQUI}}';

            fetch(DISCORD_WEBHOOK, requestOptions)
                .then(() => alert('success'))
                .catch(error => {
                    alert('Erro ao postar no discord')
                    console.error(error);
                })
        })
    // To get profile picture
    //     https://www.instagram.com/mendiratta20/?__a=1
})();