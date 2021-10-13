var fetch = require('node-fetch');
const urlRegex = require('url-regex');



window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("submitQuestion").addEventListener("click", Main);

    function Main(){
      replaceText('AnswerFromGoogle','')
      let question = document.getElementById("Question").value
      let answer_1 = document.getElementById("Answer 1").value
      let answer_2 = document.getElementById("Answer 2").value
      let answer_3 = document.getElementById("Answer 3").value
      let answer_4 = document.getElementById("Answer 4").value


      let quizlet = document.getElementById("Quizlet")

      
      let answer_array = [
        [answer_1,0],
        [answer_2,0],
        [answer_3,0],
        [answer_4,0]
      ]

      let fixedQuestion = question.replace(/ /g,'+')

      fetch('https://www.google.com/search?q='+fixedQuestion,{
                headers: {
                  'Host': 'www.google.com',
                  'upgrade-insecure-requests': '1',
                  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
                  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                  'sec-gpc': '1',
                  'sec-fetch-site': 'none',
                  'sec-fetch-mode': 'navigate',
                  'sec-fetch-user': '?1',
                  'sec-fetch-dest': 'document',
                  'accept-language': 'en-US,en;q=0.9',
                  'dnt': '1',
                },
                timeout: 10000, 
                follow: 20, 
      })
        .then(res => res.text())
        .then(body => {
          answer_array.forEach(element => {
            if(body.includes(element[0])===true){
                element[1]++
                replaceText('AnswerFromGoogle',answer_array)
            }
	      	})
          let more_urls = body.match(urlRegex())



          more_urls.forEach(element => {

            let base = 'https://'
            if(quizlet.checked===true){
              base = 'https://quizlet'
              console.log('Quizlet Enabled Search')
            } 

            console.log(base)
            if(element.startsWith(base)===true){
                fetch(element, {
                    headers: {
                        'cache-control': 'max-age=0',
                        'User-Agent': 'QuizletIOS/6.2.1 (QuizletBuild/3; iPhone13,2; iOS 15.0.1; Scale/3.0)',
                        'Accept': '*/*',
                        'sec-gpc': '1',
                        'sec-fetch-site': 'none',
                        'sec-fetch-mode': 'navigate',
                        'sec-fetch-user': '?1',
                        'sec-fetch-dest': 'document',
                        'accept-language': 'en-US,en;q=0.9',
                    },
                    timeout: 5000, 
                    follow: 20, 
                })
                .then(res => res.text())
                .then(body => {
                    answer_array.forEach(element => {
                        if(body.includes(element[0])===true){
                            element[1]++
                        }
                    });
                    replaceText('AnswerFromGoogle',answer_array)
                })
                .catch(err => {
                    console.log(err)
                })
            } 
        })
        });


    
 
        
    }
  })


  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }