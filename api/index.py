import replicate
import base64
import requests

from fastapi import FastAPI, Request, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from urllib.request import urlopen 

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():
    return {"message": "Hello World"}

# call replicate directly
@app.get("/get_image")
def get_image(input: dict):

    # using file imports for model and garment images - testing only
    # model_img = open("././public/models/model_2.png", "rb")
    # garm_img = open("././public/garments/sweater.png", "rb")

    input = {
        "garm_img": input["garm_img"],
        "human_img": input["human_img"],
        "garment_des": "crop top"
    }

    # straight up from docs: https://replicate.com/cuuupid/idm-vton/api/learn-more 
    # input = {
    #     "garm_img": "https://replicate.delivery/pbxt/KgwTlZyFx5aUU3gc5gMiKuD5nNPTgliMlLUWx160G4z99YjO/sweater.webp",
    #     "human_img": "https://replicate.delivery/pbxt/KgwTlhCMvDagRrcVzZJbuozNJ8esPqiNAIJS3eMgHrYuHmW4/KakaoTalk_Photo_2024-04-04-21-44-45.png",
    #     "garment_des": "cute pink top"
    # }

    output = replicate.run(
        "cuuupid/idm-vton:906425dbca90663ff5427624839572cc56ea7d380343d13e2a4c4b09d3f0c30f",
        input=input
    )
    return(output)

@app.post("/upload")
def upload(modelFilePath: str = Form(...), garmFilePath: str = Form(...)):
    # convert to File obj
    model_img = open(modelFilePath, "rb")
    garm_img = open(garmFilePath, "rb")

    # construct input, call Replicate
    return(get_image(parse_input(model_img, garm_img)))
     
  

# Construct input
def parse_input(model_img, garm_img):
    parsed_input = {
        "garm_img": garm_img,
        "human_img": model_img,
        "garment_des": "crop top"
    }
    return parsed_input

