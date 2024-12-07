import React from 'react'

export const Select=({options,Selected}:{
    Selected:(value:string)=>void;
    options:{
        key:string,
        value:string
    }[];
}) =>{
    return  <select onChange={(e)=>{
        Selected(e.target.value)
    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
       {options.map((x)=><option value={x.value} >{x.key}</option>)}
  </select>
  

}

//The HTML <select> element creates a dropdown menu where users can select one of the provided options.
// onChange={(e) => { onSelect(e.target.value) }}:


// The onChange event triggers whenever the user selects an option from the dropdown. onSelect is somthing 
// The callback function receives the event object (e) as a parameter.
// e.target.value gets the value attribute of the selected <option> element.
//The onSelect function is called with this value as an argument, passing it up to the parent component.

//option map:Iterates over the options array to create an <option> element for each item.
//The <option> tag defines an option in a select list.
{/* <label for="cars">Choose a car:</label>

<select id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select> */}

