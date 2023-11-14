import {Flow as _Flow} from "Frontend/generated/jar-resources/Flow.js";
import {useEffect, useRef,} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const flow = new _Flow({
    imports: () => import("Frontend/generated/flow/generated-flow-imports.js")
});

const router = {
    render() {
        return Promise.resolve();
    }
};

export default function Flow() {
    const ref = useRef<HTMLOutputElement>(null);
    const {pathname, search, hash} = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const route = flow.serverSideRoutes[0];
        let mountedContainer: Awaited<ReturnType<typeof route["action"]>> | undefined = undefined;
        route.action({pathname, search}).then((container) => {
            const outlet = ref.current?.parentNode;
            if (outlet && outlet !== container.parentNode) {
                outlet.insertBefore(container, ref.current);
            }
            mountedContainer = container;
            if (container.onBeforeEnter) {
                container.onBeforeEnter(
                    {pathname, search},
                    {
                        prevent() {},
                        redirect: navigate
                    },
                    router,
                );
            }
        });
        return () => {
            if (mountedContainer?.onBeforeLeave) {
                mountedContainer?.onBeforeLeave({pathname, search}, {
                    prevent() {},
                }, router);
            }
            mountedContainer?.parentNode?.removeChild(mountedContainer);
            mountedContainer = undefined;
        };
    }, [pathname, search, hash]);
    return <output ref={ref} />;
}
