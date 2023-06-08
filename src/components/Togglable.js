import { forwardRef, useImperativeHandle, useState } from "react";

export const Togglable = forwardRef((props, refs) => {
  const [isOn, setIsOn] = useState(false);

  const turnOnOff = () => {
    setIsOn((prev) => !prev);
  }

  useImperativeHandle(refs, () => {
    return {
      turnOnOff
    }
  });

  return (
    <div>
      {!isOn ? <button onClick={turnOnOff}>{props.buttonLabel}</button> :
        <div>
          {props.children}
          <button onClick={turnOnOff}>cancel</button>
        </div>
       }
    </div>
  )
})