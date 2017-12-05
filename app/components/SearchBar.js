import React from 'React';
import { SearchBar } from 'react-native-elements';

export function Search(){
  return (
    <SearchBar
      round
      onChangeText={(text)=>console.log(text)}
      onClearText={()=>console.log('text cleared!')}
      placeholder='Type Here...' />
  );
}

const mapState = ({ bars })=>{
  return {
    bars
  };
};

const mapDispatch = (dispatch)=>{
  return {
    handleChange: ()=>{

    },
    handleClear: ()=>{

    }
  }
}

export default connect(mapState, mapDispatch)(Search);
