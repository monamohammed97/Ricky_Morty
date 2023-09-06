import { ComponentType, LazyExoticComponent, Suspense } from "react";
import {LoadingScreen} from "./LoadingScreen";


type ComponentProps = 
    LazyExoticComponent<() => JSX.Element>
 | ComponentType<React.ReactNode>

  const Loadable = (Component:ComponentProps) => (props:any) => (
    <Suspense fallback={<LoadingScreen isPage={true} />}>
        <Component {...props} />
    </Suspense>
);

export  {Loadable};