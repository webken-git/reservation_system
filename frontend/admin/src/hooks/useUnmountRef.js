import { useRef, useEffect } from 'react';

/*
  useUnmountRefについて：
  ・useUnmountRefは、componentがUnmount(componentを使用しなくなった時)したとき、stateをメモリリークしないようにするためのhookです。
  ・"Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function."という警告がコンソールに出た場合の解決策です。
  ・useSafeStateとセットで使用するので、useSafeState.jsも確認してください。
*/

const useUnmountRef = () => {
    const unmountRef = useRef(false);

    useEffect(
      () => () => {
        unmountRef.current = true;
      },
      []
    );
    return unmountRef;
};

export default useUnmountRef;
