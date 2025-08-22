function App() {
    return (
        <>
            <div className='flex items-center justify-center h-screen bg-[image:var(--bg-image)]'>
                <div className='form-containner'>
                    <div className='flex justify-center'>
                        <p className='font-anton shadow-blue-50 xl:text-2xl italic text-[#C3073F] text-wrap mb-2.5'>
                            Xem phim yêu thích, chỉ một cú nhấp chuột.
                        </p>
                    </div>

                    <form className='max-w-sm mx-auto '>
                        <div className='mb-1'>
                            <label
                                htmlFor='firstName'
                                className='text-white block mb-2 text-sm font-medium   dark:text-white'
                            >
                                Tên
                            </label>
                            <input
                                type='firstName'
                                id='firstName'
                                className='shadow-xs bg-gray-50 border border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
                                placeholder='Hãy nhập tên của bạn ...'
                                required
                            />
                            <div className='p-0 mt-0.5 flex justify-center '>
                                <p className='text-amber-700 italic hidden text-xs text-wrap'>
                                    Lỗi nhập
                                </p>
                            </div>
                        </div>
                        <div className='mb-1'>
                            <label
                                htmlFor='lastName'
                                className='text-white block mb-2 text-sm font-medium   dark:text-white'
                            >
                                Họ
                            </label>
                            <input
                                type='lastName'
                                id='lastName'
                                className='shadow-xs bg-gray-50 border border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
                                placeholder='Hãy nhập họ của bạn ...'
                                required
                            />
                            <div className='p-0 mt-0.5 flex justify-center '>
                                <p className='hidden text-amber-700 italic text-xs text-wrap'>
                                    Lỗi nhập
                                </p>
                            </div>
                        </div>
                        <div className='mb-1'>
                            <label
                                htmlFor='username'
                                className='text-white block mb-2 text-sm font-medium   dark:text-white'
                            >
                                Tên đăng nhập
                            </label>
                            <input
                                type='username'
                                id='username'
                                className='shadow-xs bg-gray-50 border border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
                                placeholder='Hãy nhập tên tài khoản ...'
                                required
                            />
                            <div className='p-0 mt-0.5 flex justify-center '>
                                <p className='hidden text-amber-700 italic text-xs text-wrap'>
                                    Lỗi nhập
                                </p>
                            </div>
                        </div>
                        <div className='mb-1'>
                            <label
                                htmlFor='password'
                                className='text-white block mb-2 text-sm font-medium   dark:text-white'
                            >
                                Mật khẩu
                            </label>
                            <input
                                type='password'
                                id='password'
                                className='shadow-xs bg-gray-50 border border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
                                required
                            />
                            <div className='p-0 mt-0.5 flex justify-center '>
                                <p className='hidden text-amber-700 italic text-xs text-wrap'>
                                    Lỗi nhập
                                </p>
                            </div>
                        </div>
                        <div className='mb-1'>
                            <label
                                htmlFor='repeat-password'
                                className='text-white block mb-2 text-sm font-medium   dark:text-white'
                            >
                                Nhập lại mật khẩu
                            </label>
                            <input
                                type='password'
                                id='repeat-password'
                                className='shadow-xs bg-gray-50 border border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
                                required
                            />
                            <div className='p-0 mt-0.5 flex justify-center '>
                                <p className='hidden text-amber-700 italic text-xs text-wrap'>
                                    Lỗi nhập
                                </p>
                            </div>
                        </div>
                        <div className='mb-3 flex justify-between'>
                            <p>Bạn đã có tài khoản?</p>
                            <a
                                href='#'
                                className='text-primary-500 no-underline hover:underline'
                            >
                                Đăng nhập
                            </a>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type='submit'
                                className='text-white bg-[#6F2232] hover:bg-[#950740] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                            >
                                Đăng ký tài khoản mới
                            </button>
                        </div>
                        <div className='p-0 mt-0.5 flex justify-center '>
                            <p className='hidden text-amber-700 italic text-xs text-wrap '>
                                Lỗi nhập
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default App;
