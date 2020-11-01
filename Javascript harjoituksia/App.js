import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import './App.css';

function App() {
  //Javascript-ohjelmointi II

  //TEHTÄVÄ 2.8
    /*Sort-funktio järjestelee listalla olevat elementit paikoilleen ja palauttaa järjestetyn
    listan. Oletuksena järjestäminen tapahtuu niin, että listan alkiot asetetaan nousevaan järjestykseen
    muuntamalla elementit ensiksi string-muotoon ja tämän jälkeen vertaamalla näiden UTF-16 koodauksen
    yksikköarvoja. Compare-funktio parametrina tarkoittaa, että sort-funktiolle voidaan välittää 
    vaihtoehtoinen lajittelufunktio parametreiksi, joka taas vertaa keskenään elementtejä a ja b.
    Näiden vertailusta palautetaan arvoina joko -1, 0 tai 1, ja elementit lajitellaan näille arvoille
    luotujen merkityksien mukaisesti.*/
  
  //TEHTÄVÄ 2.9
  /*const array = [
    {ma: 44}, 
    {pe: 100},
    {ke: 21}, 
    {ti: 66}, 
    {la: 22}
                ]

  const execute = () => {
    console.log(array.sort((a,b) => Object.values(a) - Object.values(b)))
  }*/

  //TEHTÄVÄ 2.10
  /*const array = [
    {ma: 44}, 
    {pe: 100},
    {ke: 21}, 
    {ti: 66}, 
    {la: 22}
                ]

  const returnDays = (arrays) => {
    let arrayCopy = array
    const days = ["ma", "ti", "ke", "to", "pe", "la", "su"]

    let uusiTaulukko = arrayCopy.map(item => Object.keys(item))
    
    let lopullinenTaulukko = []
    for(var i = 0; i < days.length; i++) {
      for(var j = 0; j < uusiTaulukko.length; j++) {
        if(uusiTaulukko[j] == days[i]) {
          lopullinenTaulukko[i] = uusiTaulukko[j]
        }
      }
    }
    return lopullinenTaulukko

  }
  
  const execute = () => {
    console.log(returnDays(array))
  }*/

  //TEHTÄVÄ 2.11
  /*const array = [
    {ma: 44}, 
    {pe: 100},
    {ke: 21}, 
    {ti: 66}, 
    {la: 22}
                ]

  const lajittele = (array) => {
    let arrayCopy = array
    let uusiTaulukko = []
    array.forEach((element) => uusiTaulukko.push(Object.values(element)))
    let uusiTaulukko2 = uusiTaulukko.filter(item => item % 2 == 0)
    uusiTaulukko = uusiTaulukko2

    let uusiTaulukko3 = []
    for(var i = 0; i < uusiTaulukko.length; i++) {
      var obj = new Object()
      obj.key = Object.keys(arrayCopy[i])
      obj.value = uusiTaulukko[i]
      uusiTaulukko3[i] = obj
    }
    return uusiTaulukko3
  }
  
  const execute = () => {
    console.log(lajittele(array))
  }*/

  //TEHTÄVÄ 2.12
  /*const array = [
    {ma: 44}, 
    {pe: 100},
    {ke: 21}, 
    {ti: 66}, 
    {la: 22}
                ]
  
  const lajittele = (array) => {
    let arrayCopy = array
    let index = 3
    let uusiTaulukko = arrayCopy.filter(item => JSON.stringify(Object.keys(item)).charAt(index) == 'e')
    return uusiTaulukko
  }

  const execute = () => {
    console.log(lajittele(array))
  }*/

  //TEHTÄVÄ 2.13
  /*const object = {
      ma: 44, 
      pe: 100,
      ke: 21, 
      ti: 66, 
      la: 22
                }
  
  const convertToList = (object) => {
    let list = []
    for(var i = 0; i < Object.keys(object).length; i++) {
      var obj = new Object()
      obj.key = Object.keys(object)[i]
      obj.value = Object.values(object)[i]
      list[i] = obj
    }
    return list
  }

  const execute = () => {
    console.log(convertToList(object))
  }*/

  return (
    <div>{execute()}</div>
  );
}

export default App;
