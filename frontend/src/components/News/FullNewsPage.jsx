import { useParams } from "react-router-dom";

function FullNewsPage({ newsArr }) {
  const { curr_uuid } = useParams();
  let news = newsArr.find((ele) => ele.uuid === curr_uuid);

  return (
    <>
      {news ? (
        <div className='fullNewsPage' style={{ margin: 'auto', backgroundColor: '#BEDADC', width: '90%', border: '1px solid grey', marginTop: '10px' }}>
          <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={news.image_url || 'https://www.freeiconspng.com/uploads/no-image-icon-13.png'} alt="image loading" />
          <h2 style={{ fontSize: '50px' }}>{news.title}</h2>
          <p><b>categories</b>:{news.categories.map((ele) => ele)}</p>
          <p><b>language</b>:{news.language}</p>
          <p><b>published_at</b>:{news.published_at}</p>
          <p><b>source</b>:{news.source}</p>
          <p>{news.description}</p>
          <a href={news.url}>Read more-</a>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default FullNewsPage;

/*
categories: Array [ "general" ]
   ​
description: "치안이 극도로 악화된 남미 에콰도르에서 수감자 탈옥 사태와 대법원장 자택 앞 폭탄테러에 이어 무장 괴한의 방송국 난..."
   ​
image_url: "http://www.sisajournal.com/news/thumbnail/202401/280792_201092_3645_v150.jpg"
   ​
keywords: ""
   ​
language: "ko"
   ​
published_at: "2024-01-10T14:38:53.000000Z"
   ​
relevance_score: null
   ​
snippet: "글씨키우기 글씨줄이기 프린트 top\n\nfacebook twitter kakao story naver band share\n\n현장에서 총성과 “쏘지 말라” 외침 들려…관련?..."
   ​
source: "sisajournal.com"
   ​
title: "TV 생방송에 총 든 괴한 10여 명 난입…‘무법천지’ 에콰도르"
   ​
url: "http://www.sisajournal.com/news/articleView.html?idxno=280792"
   ​
uuid: "8a9a3ac2-77d1-4622-abce-6f3ebf84235c"
*/