export const CODE_PREVIEW = [
    {
      indent: 0,
      tokens: [
        { t: 'kw', v: 'async function' },
        { t: 'fn', v: ' collaborate' },
        { t: 'plain', v: '() {' },
      ],
    },
    {
      indent: 1,
      tokens: [
        { t: 'kw', v: 'const' },
        { t: 'plain', v: ' room = ' },
        { t: 'kw', v: 'await' },
        { t: 'fn', v: ' createRoom' },
        { t: 'plain', v: '({' },
      ],
    },
    {
      indent: 2,
      tokens: [
        { t: 'prop', v: 'lang' },
        { t: 'plain', v: ': ' },
        { t: 'str', v: '"python"' },
        { t: 'plain', v: ',' },
      ],
    },
    {
      indent: 2,
      tokens: [
        { t: 'prop', v: 'users' },
        { t: 'plain', v: ': ' },
        { t: 'num', v: '50' },
        { t: 'plain', v: ',' },
      ],
    },
    { indent: 1, tokens: [{ t: 'plain', v: '});' }] },
    { indent: 0, tokens: [] },
    {
      indent: 1,
      tokens: [{ t: 'cmt', v: '// Real-time sync starts instantly' }],
    },
    {
      indent: 1,
      tokens: [
        { t: 'kw', v: 'await' },
        { t: 'fn', v: ' room.invite' },
        { t: 'plain', v: '(teammates);' },
      ],
    },
    { indent: 0, tokens: [{ t: 'plain', v: '}' }] },
  ];
  
  export const TOKEN_COLORS = {
    kw: '#89b4fa',
    fn: '#a6e3a1',
    str: '#f9e2af',
    prop: '#cba6f7',
    num: '#fab387',
    cmt: 'rgba(255,255,255,0.25)',
    plain: 'rgba(255,255,255,0.7)',
  };