from django.views import View
from django.http import JsonResponse
from web3 import Web3
from attributedict.collections import AttributeDict
from hexbytes import HexBytes
import json

infura_url = "https://eth.llamarpc.com"
web3 = Web3(Web3.HTTPProvider(infura_url))

class HexDictJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, dict):
            return dict(obj)
        if isinstance(obj, AttributeDict):
            return dict(obj)
        if isinstance(obj, HexBytes):
            return str(obj.hex())
        if isinstance(obj, list):
          return [self.default(item) for item in obj]
        return super().default(obj)

class LatestBlockView(View):
  def get(self, request, *args, **kwargs):
    data = web3.eth.get_block('latest')

    dataDict = dict(data)

    del dataDict['withdrawals']

    response = json.dumps(dataDict, cls=HexDictJsonEncoder)

    return JsonResponse(response, safe=False)
