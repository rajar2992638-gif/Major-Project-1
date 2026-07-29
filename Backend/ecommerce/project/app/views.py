from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import (
    Product,
    Order,
    OrderItem,
    ShippingAddress,
    Wishlist,
)

from .serializer import (
    ProductSerializer,
    UserSerializerWithToken,
    OrderSerializer,
    WishlistSerializer,
)


# ---------------- ROUTES ----------------
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/product/<id>/',
        '/api/users/register/',
        '/api/user/login/',
    ]
    return Response(routes)


# @api_view(['GET'])
# def getProducts(request):

# @api_view(['GET'])
# def getProducts(request):

#     keyword = request.GET.get("keyword", "")
#     category = request.GET.get("category", "")
#     brand = request.GET.get("brand", "")

#     products = Product.objects.all()

#     if keyword:
#         products = products.filter(
#             Q(name__icontains=keyword) |
#             Q(description__icontains=keyword)
#         )

#     if category:
#         products = products.filter(category__iexact=category)

#     if brand:
#         products = products.filter(brand__iexact=brand)

#     serializer = ProductSerializer(products, many=True)

#     return Response(serializer.data)



# ---------------- PRODUCTS ----------------

@api_view(['GET'])
def getProducts(request):

    keyword = request.GET.get("keyword")

    products = Product.objects.all()

    if keyword:
        products = products.filter(
            Q(name__icontains=keyword) |
            Q(category__icontains=keyword) |
            Q(brand__icontains=keyword) |
            Q(description__icontains=keyword)
        )

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request, pk):

    product = get_object_or_404(Product, _id=pk)

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)



# ---------------- JWT LOGIN ----------------

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):

        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        data.update(serializer)

        return data



class MyTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer



# ---------------- REGISTER ----------------

@api_view(['POST'])
def registerUser(request):

    data = request.data

    try:

        user = User.objects.create_user(
            first_name=data['fname'],
            last_name=data['lname'],
            username=data['email'],
            email=data['email'],
            password=data['password']
        )

        return Response({
            "details":"Signup is Successful"
        })


    except Exception as e:

        return Response({
            "details":str(e)
        })



# ---------------- ORDER CREATE ----------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):

    print("USER :",request.user)
    print("AUTH :",request.auth)


    data=request.data

    order = Order.objects.create(

        user=request.user,

        paymentMethod=data['paymentMethod'],

        taxPrice=data['taxPrice'],

        shippingPrice=data['shippingPrice'],

        totalPrice=data['totalPrice']

    )


    shipping=data['shippingAddress']


    ShippingAddress.objects.create(

        order=order,

        address=shipping['address'],

        city=shipping['city'],

        postalCode=shipping['postalCode'],

        country=shipping['country']

    )


    for item in data['orderItems']:

        product=Product.objects.get(
            _id=item['_id']
        )


        OrderItem.objects.create(

            order=order,

            product=product,

            name=product.name,

            qty=item['qty'],

            price=item['price'],

            image=str(product.image)

        )


    serializer=OrderSerializer(order,many=False)


    return Response(serializer.data)



# ---------------- MY ORDERS ----------------


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):


    orders=Order.objects.filter(
        user=request.user
    ).order_by('-createdAt')


    serializer=OrderSerializer(
        orders,
        many=True
    )


    return Response(serializer.data)




# ---------------- USERS ----------------


@api_view(['GET'])
def getUsers(request):

    users=User.objects.order_by('-date_joined')[:5]


    data=[]


    for user in users:

        data.append({

            "id":user.id,

            "name":user.username,

            "email":user.email

        })


    return Response(data)




# ---------------- WISHLIST ----------------


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addWishlist(request):


    product=get_object_or_404(
        Product,
        _id=request.data['product']
    )


    wishlist,created=Wishlist.objects.get_or_create(

        user=request.user,

        product=product

    )


    serializer=WishlistSerializer(
        wishlist,
        many=False
    )


    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWishlist(request):


    wishlist=Wishlist.objects.filter(
        user=request.user
    )


    serializer=WishlistSerializer(
        wishlist,
        many=True
    )


    return Response(serializer.data)




@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request, pk):

    product = get_object_or_404(
        Product,
        _id=pk
    )

    product.delete()

    return Response({
        "message": "Product Deleted Successfully"
    })



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeWishlist(request, pk):

    wishlist = get_object_or_404(
        Wishlist,
        _id=pk,
        user=request.user
    )

    wishlist.delete()

    return Response({
        "message": "Wishlist Item Removed"
    })