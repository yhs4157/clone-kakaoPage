window.onload = () => {
    console.log("push onload"); 

    const main = document.querySelector("main")

    //* 경로에 맞는 콘텐츠 렌더
    const renderContents = () => {
        console.log("renderContets");

        const { pathname } = window.location
        switch (pathname) {
            case "/some":
                main.innerHTML =
                    "<div><button type='button'>move to /some</button></div>"

                const button = document.querySelector("button")
                button.addEventListener("click", () => {
                    const targetUrl = "/some"
                    const { pathname, search } = window.location

                    //* 같은 URL 은 스택에 추가하지 않는다
                    if (targetUrl === `${pathname}${search}`) {
                        return
                    }

                    const locationChangeEvent = new CustomEvent(
                        "locationchange",
                        {
                            composed: true,
                            detail: { href: targetUrl },
                        }
                    )

                    //* 주소변경 이벤트 Dispatch
                    window.dispatchEvent(locationChangeEvent)
                })
                break
            default:
                main.innerHTML = "<div>404</div>"
        }
    };

    const handleLocationChange = (e) => {
        console.log("handleLocationChange");

        const { href } = e.detail
        console.log(href); 

        //* 주소변경
        window.history.pushState(undefined, "타이틀", href)
        //* 콘텐츠 렌더링
        renderContents()
    };

    //* locationchange 이벤트리스너
    window.addEventListener("locationchange", handleLocationChange);

    main.innerHTML = "<div><button type='button'>move to /some</button></div>";

    const button = document.querySelector("button");

    button.addEventListener("click", () => {
        console.log("addEventListener");

        const targetUrl = "/some?foo=bar"
        const { pathname, search } = window.location

        //* 같은 URL 은 스택에 추가하지 않는다
        if (targetUrl === `${pathname}${search}`) {
            return
        }

        const locationChangeEvent = new CustomEvent("locationchange", {
            composed: true,
            detail: { href: targetUrl },
        })

        //* 주소변경 이벤트 Dispatch
        window.dispatchEvent(locationChangeEvent)
    });

    window.addEventListener("popstate", () => {
        console.log("add popstate");
        renderContents()
    });
}


/**
 * history API
 * popstate event
 * custom event
 * 를 사용하여 제작하게 된다. 
 * 
 */