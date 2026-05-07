import { FiFacebook, FiInstagram, FiTwitter, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="mt-auto bg-gray-50 border-t border-gray-200 text-gray-600">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              Hala<span className="text-orange-500">Pizza</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Serving the most delicious, hand-crafted pizzas in town since 2010. 
              Quality ingredients, authentic recipes, and fast delivery.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="hover:text-orange-500 transition-colors">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Menu</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm hover:text-orange-500 transition-colors">Bestsellers</a></li>
              <li><a href="#" className="text-sm hover:text-orange-500 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-sm hover:text-orange-500 transition-colors">Special Offers</a></li>
              <li><a href="#" className="text-sm hover:text-orange-500 transition-colors">Combos</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm hover:text-orange-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-orange-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-sm hover:text-orange-500 transition-colors">Delivery Info</a></li>
              <li><a href="#" className="text-sm hover:text-orange-500 transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3">
                <FiPhone className="h-4 w-4 text-orange-500" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="h-4 w-4 text-orange-500" />
                <span className="text-sm">hello@halapizza.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="h-4 w-4 mt-1 text-orange-500 shrink-0" />
                <span className="text-sm">123 Pizza Street, Foodie Avenue, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Hala Pizza Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="text-xs hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs hover:text-orange-500 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs hover:text-orange-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
