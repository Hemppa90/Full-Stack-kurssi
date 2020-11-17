import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [listOfQuestions, setListOfQuestions] = useState
  ( 
    [
      [{question: "What is the circumference of Earth?",
        answer1:{ answer: "42300 km",
                  user_choice: false,
                  correctness: false
                },
        answer2:{ answer: "40075 km",
                  user_choice: false,
                  correctness: true
                },
        answer3:{ answer: "38560 km",
                  user_choice: false,
                  correctness: false
                },
        answer4:{ answer: "44075 km",
                  user_choice: false,
                  correctness: false
                },
        answer5:{ answer: "41075 km",
                  user_choice: false,
                  correctness: false
                }
      },
      {question: "Who was the third president of the United States of America?",
        answer1:{ answer: "Martin Van Buren",
                  user_choice: false,
                  correctness: false
                },
        answer2:{ answer: "Franklin Pierce",
                  user_choice: false,
                  correctness: false
                },
        answer3:{ answer: "Ulysses S. Grant",
                  user_choice: false,
                  correctness: false
                },
        answer4:{ answer: "Thomas Jefferson",
                  user_choice: false,
                  correctness: true
                },
        answer5:{ answer: "John Quincy Adams",
                  user_choice: false,
                  correctness: false
                }
      }],
    
      
      [{question: "What is Donald Trump's wife's firstname?",
        answer1:{ answer: "Lisa",
                  user_choice: false,
                  correctness: false
                },
        answer2:{ answer: "Laura",
                  user_choice: false,
                  correctness: false
                },
        answer3:{ answer: "Catherine",
                  user_choice: false,
                  correctness: false
                },
        answer4:{ answer: "Melania",
                  user_choice: false,
                  correctness: true
                },
        answer5:{ answer: "Angela",
                  user_choice: false,
                  correctness: false
                }
      },
      {question: "How many people has walked the surface of the Moon?",
        answer1:{ answer: "12",
                  user_choice: false,
                  correctness: true
                },
        answer2:{ answer: "10",
                  user_choice: false,
                  correctness: false
                },
        answer3:{ answer: "9",
                  user_choice: false,
                  correctness: false
                },
        answer4:{ answer: "7",
                  user_choice: false,
                  correctness: false
                },
        answer5:{ answer: "6",
                  user_choice: false,
                  correctness: false
                }
      }]
    ]
  )

  /* En saanut siirrettyä dataa yllä olevasta kysymysten listasta JSON-muotoon db.json tiedostoon.
     Sain kuitenkin dataa haettua db.json.ista kun laitoin kysymysten listan sinne ja suoritin
     hakuja. En saanut tätä vielä tenttiappiin, koska siinä on vielä jonkin verran refaktoroitavaa,
     mutta testailin posteja ja gettejä tässä erillisessä tiedostossa.*/

  const [data, setData] = useState([])
  const [dataAlustettu, setDataAlustettu] = useState(false)

  useEffect(() => {

    const createData = async () => {
      try {

        let result = await axios.post("http://localhost:3001/questions", listOfQuestions)
        setData(listOfQuestions)
        setDataAlustettu(true)

      } catch(exception) {
        throw ("Tietokannan alustaminen epäonnistui!")
      }
    }

    const fetchData = async () => {
      try {
        let result = await axios.get("http://localhost:3001/questions")
        if(result.data.length > 0) {
          setData(result.data)
          setDataAlustettu(true)
          console.log(data)
        }
        else {
          throw ("Data pitää alustaa!")
        }
      } catch(exception) {
        createData()
        console.log(exception)
      }
    }
    fetchData()
  }, [])

  return (
    console.log({data})
  )
}

export default App;
