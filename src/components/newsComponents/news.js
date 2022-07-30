
import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from "react-top-loading-bar";
import { setNewsData, setPopupState } from "../../actions";
import lottie from 'lottie-web';
import icons from "../../Asset/SVG/svgIcons";
import newsLoading from '../../../src/static/news-loading.json';

var animation;
const getNewsData = async (dispatch) => {
    try {
        console.log("in News data");
        const res = await fetch(`https://newsapi.org/v2/everything?q=climate+change&searchIn=title&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API}`);
        const data = await res.json()
        if (data?.status == 'error') {
            throw data?.message;
        }
        if (animation) {
            animation.destroy();
        }
        dispatch(setNewsData(data));
        dispatch(setPopupState({ status: 'show', message: 'Successfully fetched data', type: 'success' }));
    } catch (error) {
        dispatch(setPopupState({ status: 'show', message: `${error}`, type: 'error' }));
    }
}

const News = () => {
    const dispatch = useDispatch();
    const newsData = useSelector(state => state.newsData);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (Object.keys(newsData).length == 0) {
            getNewsData(dispatch);
        }
    }, [dispatch]);
    useEffect(() => {
        console.log({ newsData });
        if (Object.keys(newsData).length == 0) {
            animation = lottie.loadAnimation({
                container: document.querySelector(".loadingAnim"),
                animationData: newsLoading,
            });
        }
    }, []);
    return (
        <div className="other-details-cont">
            <div className="loadingAnim" />
            {newsData?.articles?.map(dataElem =>
            (<a href={dataElem?.url || '#'} target="_blank" className="newsCotainer OD-div">
                <p style={{ marginBottom: "0.3rem" }} className="info-p">Source: {dataElem?.source?.name || '-'}</p>
                <img className="newsImage" src={dataElem?.urlToImage} />
                <h2 className="newsTitle info-h1">{dataElem?.title || '-'}</h2>
            </a>
            ))}

        </div>
    );
};

export default News;