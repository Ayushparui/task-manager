This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## How to use it Locally

This Project uses MongoDB for Database. To setup follow the process:
1. Go to MongoDB website.
2. Create a New Project write any Name for the Project
![Screenshot (69)](https://github.com/Ayushparui/task-manager/assets/55699684/b5104683-5b01-41d3-be4e-1c68bdc91854)
3. Go to Create and choose free cluster
![Screenshot (71)](https://github.com/Ayushparui/task-manager/assets/55699684/e1dc6e81-400a-4d21-9f3a-3e4130881dff)
4. Create a Username and password
![Screenshot (72)](https://github.com/Ayushparui/task-manager/assets/55699684/6612938b-ba50-4474-800f-2f78635e2884)
5. Add Ip address as 0.0.0.0/0 and Add Entry
![image](https://github.com/Ayushparui/task-manager/assets/55699684/bfda2ee9-b12c-4f29-90c5-17788ba949a4)
6. Finish and Close
7. Click on the Connect and Go to Drivers:
![image](https://github.com/Ayushparui/task-manager/assets/55699684/409f53a8-9596-445e-b458-bf7020d72589)
8. Copy the URL in a notepad file and replace the password with the password you created with
9. After Cloning the repo on the root folder create a .env file and add the following code:


```bash
MONGO_URI = "replace with the url you copied in the notepad"
TOKEN_SECRET = "replace with any string you want, can be your name or anything"
```

10. Save the file and run it.




## This Project is Deployed on Netlify

Check out our [Link](https://cozy-crepe-8b8cd7.netlify.app/) for more details.

Live Demo:


https://github.com/Ayushparui/task-manager/assets/55699684/952c8f6e-ce72-445b-b7b1-11a6771d986a


