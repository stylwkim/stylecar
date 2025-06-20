"use client"

import { useState, useEffect } from "react"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [inputText, setInputText] = useState("")
  const [isAnimating, setIsAnimating] = useState(true)

  // 동적 효과를 위한 애니메이션 제어
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev)
    }, 2000) // 2초마다 애니메이션 토글

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    console.log("채팅 버튼 클릭!")
    setIsOpen(true)

    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "안녕하세요! 스타일카 고객센터입니다. 무엇을 도와드릴까요?",
          sender: "admin",
          time: new Date().toLocaleTimeString(),
        },
      ])
    }
  }

  const closeChat = () => {
    setIsOpen(false)
  }

  const sendMessage = () => {
    if (!inputText.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: inputText,
        sender: "user",
        time: new Date().toLocaleTimeString(),
      },
    ])

    setInputText("")

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "네, 확인해보겠습니다! 잠시만 기다려주세요.",
          sender: "admin",
          time: new Date().toLocaleTimeString(),
        },
      ])
    }, 1000)
  }

  return (
    <>
      {/* 채팅 버튼과 텍스트 */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {/* 실시간 상담 텍스트 */}
          <div
            style={{
              backgroundColor: "#3B82F6",
              color: "white",
              padding: "12px 20px",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
              position: "relative",
              transform: isAnimating ? "translateY(-5px)" : "translateY(0px)",
              transition: "all 0.3s ease-in-out",
              animation: "bounce 2s infinite",
            }}
          >
            실시간 상담
            {/* 말풍선 꼬리 */}
            <div
              style={{
                position: "absolute",
                right: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "0",
                height: "0",
                borderLeft: "8px solid #3B82F6",
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
              }}
            />
          </div>

          {/* 채팅 버튼 */}
          <button
            onClick={handleClick}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "#3B82F6",
              border: "none",
              cursor: "pointer",
              fontSize: "30px",
              boxShadow: "0 6px 25px rgba(59, 130, 246, 0.4)",
              position: "relative",
              transform: isAnimating ? "scale(1.1)" : "scale(1)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15)"
              e.currentTarget.style.backgroundColor = "#2563EB"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = isAnimating ? "scale(1.1)" : "scale(1)"
              e.currentTarget.style.backgroundColor = "#3B82F6"
            }}
          >
            💬{/* 깜빡이는 링 효과 */}
            <div
              style={{
                position: "absolute",
                top: "-5px",
                left: "-5px",
                right: "-5px",
                bottom: "-5px",
                borderRadius: "50%",
                border: "3px solid #60A5FA",
                opacity: isAnimating ? 0.7 : 0,
                transform: isAnimating ? "scale(1.2)" : "scale(1)",
                transition: "all 0.6s ease-in-out",
              }}
            />
            {/* 펄스 효과 */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: "-10px",
                right: "-10px",
                bottom: "-10px",
                borderRadius: "50%",
                border: "2px solid #93C5FD",
                opacity: isAnimating ? 0 : 0.5,
                transform: isAnimating ? "scale(1.5)" : "scale(1)",
                transition: "all 1s ease-in-out",
              }}
            />
          </button>
        </div>
      )}

      {/* 채팅창 */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "380px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0 15px 50px rgba(0,0,0,0.3)",
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "slideUp 0.3s ease-out",
          }}
        >
          {/* 헤더 */}
          <div
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
              color: "white",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#10B981",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                }}
              />
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>스타일카 고객센터</h3>
            </div>
            <button
              onClick={closeChat}
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
              }}
            >
              ×
            </button>
          </div>

          {/* 메시지 영역 */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              backgroundColor: "#F8FAFC",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  animation: "fadeIn 0.3s ease-in",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "12px 18px",
                    borderRadius: msg.sender === "user" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
                    backgroundColor: msg.sender === "user" ? "#3B82F6" : "white",
                    color: msg.sender === "user" ? "white" : "#374151",
                    border: msg.sender === "admin" ? "1px solid #E5E7EB" : "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ fontSize: "14px", lineHeight: "1.4" }}>{msg.text}</div>
                  <div
                    style={{
                      fontSize: "11px",
                      opacity: 0.7,
                      marginTop: "5px",
                      color: msg.sender === "user" ? "#DBEAFE" : "#9CA3AF",
                    }}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 입력 영역 */}
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid #E5E7EB",
              backgroundColor: "white",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="메시지를 입력하세요..."
              style={{
                flex: 1,
                padding: "12px 18px",
                border: "2px solid #E5E7EB",
                borderRadius: "25px",
                outline: "none",
                fontSize: "14px",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#3B82F6"
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB"
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              style={{
                backgroundColor: inputText.trim() ? "#3B82F6" : "#9CA3AF",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                cursor: inputText.trim() ? "pointer" : "not-allowed",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                transform: inputText.trim() ? "scale(1)" : "scale(0.9)",
              }}
              onMouseEnter={(e) => {
                if (inputText.trim()) {
                  e.currentTarget.style.backgroundColor = "#2563EB"
                  e.currentTarget.style.transform = "scale(1.05)"
                }
              }}
              onMouseLeave={(e) => {
                if (inputText.trim()) {
                  e.currentTarget.style.backgroundColor = "#3B82F6"
                  e.currentTarget.style.transform = "scale(1)"
                }
              }}
            >
              📤
            </button>
          </div>
        </div>
      )}

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
