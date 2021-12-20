import { useState, useCallback } from "react";

/*
  useSafeStateについて：
  ・useSafeStateは、unmountRef.currentがtrueになった時に、
    stateを変更しないようにするためのhookです。
  ・unmountRefは、useEffectを使用して、
    stateを変更する前に、unmountRef.currentをtrueにするためのuseRefです。
  ・defaultValueは、useSafeStateの中で、
    stateを変更する前に、unmountRef.currentがtrueになっているかを確認するためのデフォルト値です。
*/
/*
  使用方法：
  ・useUnmountRefとuseSafeStateをimportする。
  ・下記の様に、useUnmountRefを使用するコンポーネントを作成する。
  const unmountRef = useUnmountRef();
  const [state, setstate] = useSafeState(unmountRef, 初期値（[]、""など）);
*/

const useSafeState = (unmountRef, defaultValue) => {
  const [state, changeState] = useState(defaultValue);
    const wrapChangeState = useCallback(
      (v) => {
        if (!unmountRef.current) {
          changeState(v);
        }
      },
      [changeState, unmountRef]
    );

    return [state, wrapChangeState];
};

export default useSafeState;
