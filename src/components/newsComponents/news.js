
import { React, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setNewsData, setPopupState } from "../../actions";
import lottie from 'lottie-web';
import newsLoading from '../../../src/static/news-loading.json';

var animation;
const getNewsData = async (dispatch) => {
    try {
        console.log("in News data");
        const res = await fetch(`https://api.newscatcherapi.com/v2/search?q=climate+change&lang=en&search_in=title&sort_by=date`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_NEWSCATCHERAPI_API_KEY,
            },
        });
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
            (<a href={dataElem?.link || '#'} target="_blank" className="newsCotainer OD-div">
                <p style={{ marginBottom: "0.3rem" }} className="info-p">Source: {dataElem?.authors || '-'}</p>
                <img className="newsImage" src={dataElem?.media} />
                <h2 className="newsTitle info-h1">{dataElem?.title || '-'}</h2>
            </a>
            ))}

        </div>
    );
};

export default News;