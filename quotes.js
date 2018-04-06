function getNewQuote(idImage, idMusic) {

    let quotes;    
    let author;

    $.ajax({
        url: 'https://api.forismatic.com/api/1.0/',
        jsonp: 'jsonp',
        dataType: 'jsonp',
        data: {
            method: 'getQuote',
            lang: 'en',
            format: 'jsonp'
        },
        success: function(response) {
            
            quotes = response.quoteText;
            author = response.quoteAuthor;

            if (!author) {
                author = '~ unknown'
            } else {
                author = '~' + " " + response.quoteAuthor
            }

            $('#quoteText').text(quotes)
            $('#quoteAuthor').text(author)

            console.log(response);

            let objQuotes = {
                quotes: quotes,
                author: author
            }

            axios.post('http://localhost:3000/quotes/save', objQuotes)
            .then(function(response) {
                console.log('ini response', response)
                console.log('id quotes', response.data.quotes._id)
                let idQuote = response.data.quotes._id;
                let userid = localStorage.getItem('id');
                axios.post('http://localhost:3000/history', {
                    image: idImage,
                    music: idMusic,
                    quote: idQuote,
                    user: userid
                })
                .then(function (response) {
                    console.log("berhasil masuk ke history--", response)
                })
                .catch(function (error) {
                    console.log("error- ", error)
                })
            })
            .catch(function(error) {
                console.log('ini error', error)
            })
        }
    })
}


function showQuotes() {

    axios.get('http://localhost:3000/quotes')
    .then(function(response) {
        console.log('ini show quotes', response)
    })
    .catch(function(error) {
        console.log('ini error show quotes', error)
    })

}

