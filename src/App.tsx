import React from 'react';
import './App.css';
import Button from "./components/ui/button/Button";
import Icon from "./components/ui/icon/Icon";
import Input from "./components/form/Input";
import RcCheckbox from "./components/form/Checkbox";

function App() {
  return (
    <div className="App">
      Hello world!
      <Button className={"test"}>Click here</Button>
      <Icon className={"test"}>icon</Icon>
      <Input isTextarea={false} disabled/>
      <Input isTextarea error={"test"}/>
      <RcCheckbox error={""} className={""} isDisabled={false}></RcCheckbox>
    </div>
  );
}

export default App;
