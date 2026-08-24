import React from 'react'
import SDGSectionLogo from './SDGSection'

const SDGBanner = () => {
    const imageUrls = [
        "/Home/SDG/Goals/SDG_01.jpg",
        "/Home/SDG/Goals/SDG_02.jpg",
        "/Home/SDG/Goals/SDG_03.jpg",
        "/Home/SDG/Goals/SDG_04.jpg",
        "/Home/SDG/Goals/SDG_05.jpg",
        "/Home/SDG/Goals/SDG_06.jpg",
        "/Home/SDG/Goals/SDG_07.jpg",
        "/Home/SDG/Goals/SDG_08.jpg",
        "/Home/SDG/Goals/SDG_09.jpg",
        "/Home/SDG/Goals/SDG_10.jpg",
        "/Home/SDG/Goals/SDG_11.jpg",
        "/Home/SDG/Goals/SDG_12.jpg",
        "/Home/SDG/Goals/SDG_13.jpg",
        "/Home/SDG/Goals/SDG_14.jpg",
        "/Home/SDG/Goals/SDG_15.jpg",
        "/Home/SDG/Goals/SDG_16.jpg",
        "/Home/SDG/Goals/SDG_17.jpg",
    ];

    return (
        <div className='bg-black py-8'>
            <div className='container mx-auto flex lg:flex-row flex-col justify-center items-center gap-y-12 gap-x-32'>
                <div className='flex items-center'>
                    <SDGSectionLogo />
                </div>
                {/* Grid of images in the center */}
                <div className="grid grid-cols-6 mx-8">
                    {imageUrls.map((url, index) => (
                        <div key={index} className="w-20 h-20 bg-white p-1 rounded-md shadow-md">
                            <img src={url} alt={`SDG ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                        </div>
                    ))}
                </div>

                <div className='flex'>
                    <img src='/Home/SDG/sdg_white.svg' className='w-full h-full' />
                </div>
            </div>
        </div>

    )
}

export default SDGBanner