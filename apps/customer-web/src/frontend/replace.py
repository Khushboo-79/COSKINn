import os

file_path = r"C:\coskin\COSKINn\apps\customer-web\src\frontend\src\components\common\Footer.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace hardcoded colors with tailwind theme classes or CSS variables
# #2B5968 -> text-theme-dark, border-theme-dark, bg-theme-dark
content = content.replace("text-[#2B5968]", "text-theme-dark")
content = content.replace("border-[#2B5968]", "border-theme-dark")
content = content.replace("bg-[#2B5968]", "bg-theme-dark")
content = content.replace("text-[#FF2D7A]", "text-theme-primary")
content = content.replace("bg-[#FF2D7A]", "bg-theme-primary")
content = content.replace("focus:border-[#FF2D7A]", "focus:border-theme-primary")
content = content.replace("focus:ring-[#FF2D7A]", "focus:ring-theme-primary")
content = content.replace("hover:bg-[#E01E63]", "hover:bg-theme-secondary")
content = content.replace("hover:text-[#FF2D7A]", "hover:text-theme-primary")
content = content.replace("text-[#FF0069]", "text-theme-primary")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Replaced colors successfully.")
