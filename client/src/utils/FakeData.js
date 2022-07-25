import GTranslateIcon from '@mui/icons-material/GTranslate'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LogoutIcon from '@mui/icons-material/Logout'

export const SYSTEM_MENU_ITEMS = [
    {
        icon: <PermIdentityIcon />,
        title: 'Trang cá nhân',
        to: '/profile',
    },
    {
        icon: <AttachMoneyIcon />,
        title: 'Nạp tiền',
    },
    {
        icon: <GTranslateIcon />,
        title: 'Tiếng Việt',
        childs: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
            ],
        },
    },
    {
        icon: <HelpOutlineIcon />,
        title: 'Trợ giúp và phản hồi',
        to: '/feedback',
    },
    {
        icon: <LogoutIcon />,
        title: 'Đăng xuất',
        separate: true,
    },
]

export const DATA_SLIDERS = [
    {
        id: 1,
        linkImg:
            'https://res.cloudinary.com/djelezy7z/image/upload/v1658011927/cld-images/l4sssa0rpaejot4lwyml.jpg',
    },
    {
        id: 2,
        linkImg:
            'https://res.cloudinary.com/djelezy7z/image/upload/v1658011960/cld-images/qxxneadtsesxky45wjkf.jpg',
    },
    {
        id: 3,
        linkImg:
            'https://res.cloudinary.com/djelezy7z/image/upload/v1658011988/cld-images/vjzxsdwagrmtbpn4vezb.jpg',
    },
    {
        id: 4,
        linkImg:
            'https://res.cloudinary.com/djelezy7z/image/upload/v1658012008/cld-images/s2luwsa1z6ivred1jexl.jpg',
    },
    {
        id: 5,
        linkImg:
            'https://res.cloudinary.com/djelezy7z/image/upload/v1658012030/cld-images/hblfwtfwvhe5vu4zzao5.jpg',
    },
    {
        id: 6,
        linkImg:
            'https://res.cloudinary.com/djelezy7z/image/upload/v1658012048/cld-images/lvt9by6pgigdwdugqzqr.jpg',
    },
]
