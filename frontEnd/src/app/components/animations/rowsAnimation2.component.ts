import { trigger, sequence, state, stagger, animate, transition, style, query, animateChild } from '@angular/animations';

export const fadeOut =
  trigger('fadeOut', [
    state('void', style({ background: '#1dc7f1', borderBottomColor: '#1dc7f1', opacity: 0, transform: 'translateY(-100px)', 'box-shadow': 'none' })),
    transition('void => *', sequence([
      animate(".2s ease")
    ])),
    transition('* => void', [animate("0.3s ease")])
  ]);

export const rowsAnimation =
  trigger('rowsAnimation', [
    transition('void => *', [
      style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
      sequence([
        animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
        animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]);

export const blub =
  trigger('blub', [
    transition(':leave', [
      style({ background: 'pink' }),
      query('*', stagger(-150, [animateChild()]), { optional: true })
    ]),
  ]);