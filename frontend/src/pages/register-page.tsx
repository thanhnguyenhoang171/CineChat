function RegisterPage() {
    return (
        <>
            <div className='register-container'>
                <div className='form-containner form-container-responsive'>
                    <div className='follow-info follow-info-responsive'>
                        <div className='justify-center'>
                            <h1 className='text-[#FFD700] text-2xl font-anton font-bold shadow-lg'>
                                Information
                            </h1>
                        </div>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Temporibus quia pariatur
                                consectetur necessitatibus voluptates voluptas
                                fugiat aspernatur labore? Aut hic, adipisci
                                asperiores molestias ipsum eos iure doloremque
                                reprehenderit? Eveniet, sequi?
                            </p>
                        </div>
                    </div>

                    <div className='left-form'>
                        <div className='flex justify-center'>
                            <p
                                className='
                                    p-title-auth p-title-auth-responsive p-title-auth-animate
                                    '
                            >
                                Xem phim yêu thích, chỉ một cú nhấp chuột.
                            </p>
                        </div>
                        <form className='max-w-sm mx-auto '>
                            <div className='mb-1'>
                                <label
                                    htmlFor='firstName'
                                    className='lable-form label-form-responsive'
                                >
                                    Tên
                                </label>
                                <input
                                    type='text'
                                    id='firstName'
                                    className='input-form'
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
                                    className='lable-form label-form-responsive'
                                >
                                    Họ
                                </label>
                                <input
                                    type='text'
                                    id='lastName'
                                    className='input-form'
                                    placeholder='Hãy nhập họ của bạn ...'
                                    required
                                />
                                <div className='p-0 mt-0.5 flex justify-center '>
                                    <p className='p-error'>Lỗi nhập</p>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <label
                                    htmlFor='username'
                                    className='lable-form label-form-responsive'
                                >
                                    Tên đăng nhập
                                </label>
                                <input
                                    type='text'
                                    id='username'
                                    className='input-form'
                                    placeholder='Hãy nhập tên tài khoản ...'
                                    required
                                />
                                <div className='p-0 mt-0.5 flex justify-center '>
                                    <p className='p-error'>Lỗi nhập</p>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <label
                                    htmlFor='password'
                                    className='lable-form label-form-responsive'
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    className='input-form'
                                    placeholder='Hãy nhập mật khẩu'
                                    required
                                />
                                <div className='p-0 mt-0.5 flex justify-center '>
                                    <p className='p-error'>Lỗi nhập</p>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <label
                                    htmlFor='repeat-password'
                                    className='lable-form label-form-responsive'
                                >
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    type='password'
                                    id='repeat-password'
                                    className='input-form'
                                    placeholder='Hãy nhập lại mật khẩu'
                                    required
                                />
                                <div className='p-0 mt-0.5 flex justify-center '>
                                    <p className='p-error'>Lỗi nhập</p>
                                </div>
                            </div>
                            <div className='mb-3 flex justify-between'>
                                <p className='p-have-account'>
                                    Bạn đã có tài khoản?
                                </p>
                                <a href='#' className='a-login-link '>
                                    Đăng nhập
                                </a>
                            </div>
                            <div className='flex justify-center'>
                                <button
                                    type='submit'
                                    className='btn-register btn-register-responsive'
                                >
                                    Đăng ký tài khoản mới
                                </button>
                            </div>
                            <div className='p-0 mt-0.5 flex justify-center '>
                                <p className='p-error '>Lỗi nhập</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
