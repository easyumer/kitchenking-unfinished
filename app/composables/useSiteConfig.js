// Single source of truth for business facts (contact info, hours, socials) so
// they only need updating in one place. Currently placeholder/demo values —
// see README "Handoff Notes" for what needs real data before launch.
export const useSiteConfig = () => ({
  contact: {
    email: 'info@kitchenking.com',
    phone: '+1 242 000 0000',
    phoneHref: 'tel:+12420000000',
    addressLines: ['West Bay St', 'Nassau, Bahamas']
  },
  // Short single-line hours shown in the nav bar timings strip. The full weekly
  // breakdown lives in `hours` below (used by the footer).
  timings: '11:00 AM - 8:00 PM',
  hours: [
    { days: 'Monday – Thursday', time: '11:00 am – 10:00 pm' },
    { days: 'Friday – Saturday', time: '11:00 am – 11:00 pm' },
    { days: 'Sunday', time: 'Closed' }
  ],
  social: {
    instagram: '#',
    facebook: '#',
    tiktok: '#',
    linkedin: '#'
  },
  // Bahamas VAT — applied to the cart subtotal on the order/checkout page.
  taxRate: 0.1
})
