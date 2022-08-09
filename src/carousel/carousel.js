const ImgArr = [
    'https://dn-img-page.kakao.com/download/resource?kid=LmC3Q/hzHNBBZo3R/VKRJNpSNSEsxJ7Vtg9H2Qk',
    'https://dn-img-page.kakao.com/download/resource?kid=c0YCvp/hzCs95RCUG/kaJkKpTwLEFBldyuUwzWLk',
    'https://dn-img-page.kakao.com/download/resource?kid=SPW2H/hzHNFj5DfJ/tX7RAKW9uxL07iBR6ulvD1',
    'https://dn-img-page.kakao.com/download/resource?kid=bFeThc/hzHNyL2Sm6/bXcsnVYLFdTwPPnrRogtiK',
    'https://dn-img-page.kakao.com/download/resource?kid=4gzDf/hzCtgKHA4R/pU9cS1SV376K7j54BHkF61',
    'https://dn-img-page.kakao.com/download/resource?kid=cNYqDX/hzCtgKHGgc/AgtpwGvpLRtA2BFqkTenk0',
    'https://dn-img-page.kakao.com/download/resource?kid=btODPG/hzHNyFgQrB/xKPOl0kvCDIn19XewKGVwK',
    'https://dn-img-page.kakao.com/download/resource?kid=bMSm1i/hzCtdtGVDn/dSSlk1zD2dcOvm3XYmBGmk',
    'https://dn-img-page.kakao.com/download/resource?kid=p2TF6/hzHNBvevEq/ay3KYOGQypvTFywoXfc6EK',
    'https://dn-img-page.kakao.com/download/resource?kid=b9Xt6/hzHNzjSEAe/kQ1KUB6eatkqGPhdy1wIsK',
    'https://dn-img-page.kakao.com/download/resource?kid=ehXtBd/hzCtdf0VcP/XVukwa8lcIIb99GtMmsSxK',
    'https://dn-img-page.kakao.com/download/resource?kid=c6sUlt/hzHNv2QdkT/rCDIuhaBpUkDivVGhCj3R1',
];

const ul = document.createElement('ul'); 

let count = 0; 
const li_arr = ImgArr.map((ele) => {
    const li = document.createElement('li'); 
    const img = document.createElement('img'); 
    img.src = ele; 
    li.appendChild(img); 
    li.dataset.index = count;  
    count++; 
    li.classList.add('hidden');
    return li; 
    }
);

console.log(li_arr); 


let temp = 0; 
li_arr[temp].classList.remove('hidden'); 

const button = document.createElement('button'); 
button.innerHTML = '다음'; 
button.onclick = event => {
    event.preventDefault();
    console.log('버튼'); 
    li_arr[temp].classList.add('hidden'); 
    temp++;
    temp %= li_arr.length; 
    li_arr[temp].classList.remove('hidden'); 
}

li_arr.forEach((ele) => {
    ul.appendChild(ele); 
})

const carousel = document.querySelector('#top-carousel');

carousel.appendChild(ul); 
carousel.appendChild(button); 