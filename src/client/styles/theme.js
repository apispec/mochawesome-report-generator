import { tint, opacify } from 'polished'
import { generateMedia } from "styled-media-query";

export const media = generateMedia({
    large: "1200px",
    medium: "992px",
    small: "768px"
});

const theme = {
    font: {
        base: {
            family: "'robotoregular', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            size: '14px',
            lineHeight: '1.429'
        },
        light: {
            family: 'robotolight'
        }
    },
    color: {
        text: 'black87',
        body: '#f2f2f2',
        black87: 'rgba(0, 0, 0, 0.87)',
        ltblue500: '#03a9f4',
        gray: {
            base: '#000',
            regular: props => { console.log('T', props); return tint(0.335, props.theme.color.gray.base) },
            light: props => { console.log('T', props); return tint(0.467, props.theme.color.gray.base) },
            lighter: props => { console.log('T', props); return tint(0.935, props.theme.color.gray.base) },
            lighterFaded: props => { console.log('T', props); return opacify(0.95, props.theme.color.gray.lighter) },
        },
        green700: '#388e3c',
        green100: '#c8e6c9',
        red700: '#d32f2f',
        red100: '#ffcdd2',
        ltblue700: '#0288d1',
        ltblue100: '#b3e5fc',
        grey700: '#616161',
        grey100: '#f5f5f5',
    },
    footer: {
        height: '60px'
    },
    link: {
        transition: 'color 0.2s ease-out'
    },
    container: {
        sm: {
            width: '720px'
        },
        md: {
            width: '940px'
        },
        lg: {
            width: '1140px'
        }
    },
    navbar: {
        default: {
            height: '122px'
        },
        short: {
            height: '56px'
        }
    },
    grid: {
        gutter: {
            width: '30px'
        }
    },
    shadow: {
        zDepth1: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)'
    }
};

// TODO
theme.color.text = theme.color.black87;
theme.container.sm.width = `calc(${theme.container.sm.width} + ${theme.grid.gutter.width})`
theme.container.md.width = `calc(${theme.container.md.width} + ${theme.grid.gutter.width})`
theme.container.lg.width = `calc(${theme.container.lg.width} + ${theme.grid.gutter.width})`
/*
const myUserTheme = (parentTheme) => ({
    backgroundColor: 'ugly-green'
})
*/
export default theme
