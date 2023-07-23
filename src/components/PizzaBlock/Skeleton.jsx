import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="133" cy="133" r="133" />
        <rect x="0" y="295" rx="10" ry="10" width="280" height="23" />
        <rect x="-1" y="335" rx="10" ry="10" width="280" height="88" />
        <rect x="-2" y="454" rx="10" ry="10" width="95" height="30" />
        <rect x="124" y="451" rx="9" ry="9" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton