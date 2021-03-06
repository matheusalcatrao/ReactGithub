import styled, { keyframes, css } from 'styled-components';
// height: 100vh = tela inteira

const rotate = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }

`;

export const Loading = styled.div`
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    svg {
        padding: 10px 15px;
        animation: ${rotate} 1s infinite;
        width: 70px;
        height: 70px;
    }
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 13px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const Back = styled.span`
    /* display: flex;
    flex-direction: row;
    align-items: left; */
    a {
        text-decoration: none;
    }

    svg {
        height: 50px;
        width: 50px;
        &:hover {
            animation: ${rotate} 1s normal;
        }
    }
`;

export const IssuesList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 2px solid #eee;
        border-radius: 4px;
        margin-bottom: 5px;

        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                }
            }

            p {
                font-size: 12px;
                color: #999;
                margin-top: 5px;
            }
        }
    }
`;
