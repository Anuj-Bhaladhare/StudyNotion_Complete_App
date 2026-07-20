import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"

const Home = () => {
    return (
        <>

            {/* Section - 1 */}
            <div className="relative mx-auto flex flex-col w-11/12 ">
                <Link to={"/signup"}>
                    <div>
                        <div>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
            </div>

            {/* Section - 2 */}


            {/* Section - 3 */}


            {/* Footer */}

        </>
    )
}

export default Home;
