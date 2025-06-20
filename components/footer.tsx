"use client"

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">스타일카</h3>
            <p className="text-gray-400 mb-4">프리미엄 자동차용품 전문 쇼핑몰</p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">고객센터</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>1588-1234</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>help@stylecar.co.kr</span>
              </div>
              <p className="text-sm">평일 09:00-18:00</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">쇼핑 정보</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  배송/교환/환불
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">회사 정보</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  서울시 강남구 테헤란로 123
                  <br />
                  스타일카빌딩 5층
                </span>
              </div>
              <p>사업자등록번호: 123-45-67890</p>
              <p>통신판매업신고: 2024-서울강남-1234</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            <Link
              href="/admin"
              prefetch={true}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
              title="관리자 페이지"
            >
              ©
            </Link>{" "}
            2024 스타일카. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
